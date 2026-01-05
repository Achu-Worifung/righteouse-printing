"use client";

import Image from "next/image";
import { ImagePlus, X } from "lucide-react";
import { useId, useEffect } from "react";

type ImageUploaderProps = {
  images: File[];
  setImages: (files: File[]) => void;
  single?: boolean;
};

export default function ImageUploader({
  images,
  setImages,
  single = false,
}: ImageUploaderProps) {
  const inputId = useId(); 
  const handleImageSelect = (files: File[]) => {
    setImages(single ? files : [...images, ...files]);
  };

  const removeImage = (idx: number) => {
    setImages(images.filter((_, i) => i !== idx));
  };

  // Cleanup object URLs (memory-safe)
  useEffect(() => {
    return () => {
      images.forEach((file) => URL.revokeObjectURL(URL.createObjectURL(file)));
    };
  }, [images]);

  return (
    <div className="max-w-full">
      <div className="border-dashed border-2 border-gray-300 rounded-md p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
        <label
          htmlFor={inputId}
          className="flex flex-col items-center cursor-pointer"
        >
          <ImagePlus className="text-gray-400 mb-2" size={48} />
          <p className="text-gray-600">
            Click to upload {single ? "an image" : "images"}
          </p>
        </label>

        <input
          id={inputId}
          type="file"
          accept="image/*"
          multiple={!single}
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.length) {
              handleImageSelect(Array.from(e.target.files));
              e.target.value = ""; 
            }
          }}
        />
      </div>

      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-4">
          {images.map((file, idx) => {
            const previewUrl = URL.createObjectURL(file);

            return (
              <div className="relative" key={idx}>
                <Image
                  src={previewUrl}
                  alt={`Preview ${idx + 1}`}
                  width={400}
                  height={300}
                  className="object-cover rounded-md w-full h-48"
                />
                <button
                  onClick={() => removeImage(idx)}
                  type="button"
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                >
                  <X className="w-4 h-4 text-gray-700" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
