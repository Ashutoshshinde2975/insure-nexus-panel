
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { File, Upload, X } from "lucide-react";
import { validateFile, formatFileSize } from "@/utils/fileUtils";

interface FileUploadProps {
  label: string;
  description?: string;
  accept?: string;
  maxSize?: number;
  allowedTypes?: string[];
  onChange: (file: File | null) => void;
  value?: File | null;
}

export function FileUpload({
  label,
  description,
  accept = ".pdf,.jpg,.jpeg,.png",
  maxSize = 5 * 1024 * 1024, // 5MB
  allowedTypes = ["application/pdf", "image/jpeg", "image/png"],
  onChange,
  value
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(value || null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const validation = validateFile(selectedFile, allowedTypes, maxSize);
    
    if (!validation.valid) {
      toast.error(validation.error);
      return;
    }

    setUploading(true);
    setFile(selectedFile);
    
    // Simulate upload progress
    let progressValue = 0;
    const interval = setInterval(() => {
      progressValue += Math.random() * 10;
      if (progressValue >= 100) {
        clearInterval(interval);
        progressValue = 100;
        setUploading(false);
        onChange(selectedFile);
      }
      setProgress(progressValue);
    }, 200);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setProgress(0);
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <div className="text-sm font-medium">{label}</div>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
      
      <input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
      />
      
      {!file ? (
        <div 
          className="file-upload-container"
          onClick={triggerFileInput}
        >
          <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-2 text-sm font-medium">
            Drag and drop or click to upload
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Allowed formats: {accept.split(",").join(", ")} (Max: {formatFileSize(maxSize)})
          </p>
        </div>
      ) : (
        <div className="border rounded-lg p-3 bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <File className="h-6 w-6 text-primary" />
              <div>
                <p className="text-sm font-medium truncate max-w-[180px]">
                  {file.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(file.size)}
                </p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleRemoveFile}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {uploading && (
            <div className="mt-2">
              <Progress value={progress} className="h-1" />
              <p className="text-xs text-right mt-1">{Math.round(progress)}%</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
