
/**
 * Handles file upload and returns a mock URL
 */
export const uploadFile = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    // In a real app, this would upload the file to a server
    // For now, we're just creating a mock URL
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setTimeout(() => {
        // Simulate API delay
        resolve(URL.createObjectURL(file));
      }, 1000);
    };
  });
};

/**
 * Formats file size in a readable way
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Validates file type and size
 */
export const validateFile = (
  file: File, 
  allowedTypes: string[] = ['application/pdf', 'image/jpeg', 'image/png'],
  maxSize: number = 5 * 1024 * 1024 // 5MB
): { valid: boolean; error?: string } => {
  if (!allowedTypes.includes(file.type)) {
    return { 
      valid: false, 
      error: `Invalid file type. Allowed types: ${allowedTypes.map(t => t.split('/')[1]).join(', ')}` 
    };
  }
  
  if (file.size > maxSize) {
    return { 
      valid: false, 
      error: `File size exceeds the limit of ${formatFileSize(maxSize)}` 
    };
  }
  
  return { valid: true };
};
