import { Cloudinary } from '@cloudinary/url-gen';

// Initialize Cloudinary instance
const cloudinary = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  },
});

/**
 * CloudinaryService for handling image uploads and transformations
 */
export class CloudinaryService {
  /**
   * Upload an image to Cloudinary via the Next.js API route
   * @param file The file to upload
   * @param folder Optional folder name to organize uploads
   * @returns Promise with Cloudinary response containing image URL and details
   */
  static async uploadImage(file: File, folder = 'profiles'): Promise<{ url: string; publicId: string }> {
    if (!file) {
      throw new Error('No file provided for upload');
    }
    
    // Create form data for the upload
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to upload image');
      }
      
      const data = await response.json();
      return {
        url: data.secure_url,
        publicId: data.public_id,
      };
    } catch (error) {
      console.error('Image upload failed:', error);
      throw error;
    }
  }
  
  /**
   * Get an optimized image URL with transformations
   * @param publicId Cloudinary public ID of the image
   * @param options Transformation options
   * @returns Transformed image URL
   */
  static getImageUrl(publicId: string, options?: { width?: number; height?: number; crop?: string }): string {
    if (!publicId) return '';
    
    const img = cloudinary.image(publicId);
    
    if (options) {
      // Apply transformations if provided
      if (options.width || options.height) {
        // Use the correct resize syntax
        if (options.crop === 'fill') {
          img.addTransformation(`c_fill,w_${options.width || 'auto'},h_${options.height || 'auto'}`);
        } else {
          img.addTransformation(`w_${options.width || 'auto'},h_${options.height || 'auto'}`);
        }
      }
    }
    
    return img.toURL();
  }
  
  /**
   * Delete an image from Cloudinary
   * @param publicId Cloudinary public ID of the image to delete
   * @returns Promise with deletion result
   */
  static async deleteImage(publicId: string): Promise<{ result: string }> {
    try {
      const response = await fetch('/api/upload', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ publicId }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete image');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Image deletion failed:', error);
      throw error;
    }
  }
}

export default CloudinaryService; 