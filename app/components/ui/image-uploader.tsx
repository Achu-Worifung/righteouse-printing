"use client";
import Image from "next/image";
import { ImagePlus, X } from "lucide-react";

type ImageUploaderProps = {
  images?: File[] | string[];
  setImages: (files: File[]) => void;
  single?: boolean;
};

export default function ImageUploader({
  images,
  setImages,
  single = false,
}: ImageUploaderProps) {
  const handleImageSelect = (files: File[]) => {
    if (single) {
      setImages(files); // Replace when single mode
    } else {
      setImages([...(images || []), ...files]); // Append when multiple mode
    }
  };
  
  const removeImage = (idx: number) => {
    if (images) {
      setImages(images.filter((_, i) => i !== idx));
    }
  };
    
  return (
    <div className="max-w-lg">
      <div className="border-dashed border-2 border-gray-300 rounded-md p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
        <label
          htmlFor="file-input"
          className="flex flex-col items-center cursor-pointer"
        >
          <ImagePlus className="text-gray-400 mb-2" size={48} />
          <p className="text-gray-600">
            Click to upload {single ? "an image" : "images"}
          </p>
        </label>
        <input
          id="file-input"
          type="file"
          accept="image/*"
          multiple={!single}
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              handleImageSelect(Array.from(e.target.files));
            }
          }}
        />
      </div>

      {images && images.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-4">
          {images.map((url, idx) => (
            <div className="relative" key={idx}>
              <Image
                src={url instanceof File ? URL.createObjectURL(url) : url}
                alt={`Preview ${idx + 1}`}
                width={400}
                height={300}
                className="object-cover rounded-md w-full h-48"
              />
              <button
                onClick={() => removeImage(idx)}
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                type="button"
              >
                <X className="w-4 h-4 text-gray-700" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
