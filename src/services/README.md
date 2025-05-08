# Cloudinary Service

This service provides reusable functionality for image uploads and management using Cloudinary.

## Setup

1. Set up Cloudinary environment variables in your `.env.local` file:

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

2. Make sure the API route `/api/upload` is properly configured.

## Usage

### Importing the service

```typescript
import CloudinaryService from "@/services/cloudinary";
```

### Uploading an image

```typescript
const handleFileUpload = async (file: File) => {
  try {
    const result = await CloudinaryService.uploadImage(file, 'your-folder-name');
    // result.url contains the secure URL of the uploaded image
    // result.publicId contains the Cloudinary public ID for future reference
    console.log('Uploaded image URL:', result.url);
    return result.url;
  } catch (error) {
    console.error('Upload failed:', error);
  }
};
```

### Getting a transformed image URL

```typescript
const imageUrl = CloudinaryService.getImageUrl('public_id', {
  width: 300,
  height: 300,
  crop: 'fill'
});
```

### Deleting an image

```typescript
const handleDelete = async (publicId: string) => {
  try {
    const result = await CloudinaryService.deleteImage(publicId);
    console.log('Delete result:', result);
  } catch (error) {
    console.error('Delete failed:', error);
  }
};
```

## Example Implementation

The service is used in the CreateProfile component to upload profile pictures. Check out `frontend/src/components/ProfileCreation/CreateProfile/CreateProfile.tsx` for a complete implementation example. 