"use client";
import { useState } from "react";
import ImageUploader from "../components/ui/image-uploader";

export default function AdminPage() {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const single = true; // Control single/multiple mode here
  
  const handleImageSelect = (files: File[]) => {
    if (single) {
      setImageFiles(files); // Replace when single mode
    } else {
      setImageFiles(prev => [...prev, ...files]); // Append when multiple mode
    }
  };
  
  const removeImage = (idx: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Page</h1>
      <ImageUploader
        onImageSelect={handleImageSelect}
        previewImageUrl={imageFiles.length > 0 ? imageFiles : null}
        onRemoveImage={removeImage}
        single={single} // Pass the same value to keep it consistent
      />
    </div>
  );
}