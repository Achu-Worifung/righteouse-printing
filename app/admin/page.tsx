"use client";
import { useState } from "react";
import ImageUploader from "../components/ui/image-uploader";

export default function AdminPage() {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const single = false; // Control single/multiple mode here
  
  

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Page</h1>
      <ImageUploader
        images = {imageFiles}
        setImages={setImageFiles}
        single={single}
      />
    </div>
  );
}