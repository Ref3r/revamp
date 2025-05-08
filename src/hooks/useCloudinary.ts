import { useMutation, useQueryClient } from '@tanstack/react-query';
import CloudinaryService from '@/services/cloudinary';

/**
 * Hook for Cloudinary operations using TanStack Query
 */
export function useCloudinary() {
  const queryClient = useQueryClient();

  // Upload image mutation
  const uploadMutation = useMutation({
    mutationFn: ({ file, folder }: { file: File; folder?: string }) => {
      return CloudinaryService.uploadImage(file, folder);
    },
    onSuccess: () => {
      // Invalidate relevant queries if needed
      // This depends on your app's query structure
    },
  });

  // Delete image mutation
  const deleteMutation = useMutation({
    mutationFn: (publicId: string) => {
      return CloudinaryService.deleteImage(publicId);
    },
    onSuccess: () => {
      // Invalidate relevant queries if needed
    },
  });

  // Helper function to get image URL with transformations
  const getImageUrl = (publicId: string, options?: { width?: number; height?: number; crop?: string }) => {
    return CloudinaryService.getImageUrl(publicId, options);
  };

  return {
    uploadImage: uploadMutation.mutateAsync,
    deleteImage: deleteMutation.mutateAsync,
    getImageUrl,
    isUploading: uploadMutation.isPending,
    isDeleting: deleteMutation.isPending,
    uploadError: uploadMutation.error,
    deleteError: deleteMutation.error,
  };
}

export default useCloudinary;
