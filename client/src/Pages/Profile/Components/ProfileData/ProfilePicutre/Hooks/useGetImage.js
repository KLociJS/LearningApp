import { useState } from "react";

export default function useGetImage() {
  const [resizedImage, setResizedImage] = useState(null);

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const image = new Image();
        image.src = e.target.result;

        image.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          const maxSize = 400; // Desired size, e.g., 400x400

          let width = image.width;
          let height = image.height;

          if (width > maxSize || height > maxSize) {
            if (width > height) {
              height = (height / width) * maxSize;
              width = maxSize;
            } else {
              width = (width / height) * maxSize;
              height = maxSize;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(image, 0, 0, width, height);
          const resizedImageUrl = canvas.toDataURL("image/jpeg");
          setResizedImage(resizedImageUrl);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  return { resizedImage, onFileChange };
}
