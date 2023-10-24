import { postProfilePicture } from "_Constants/fetchUrl";
import { useCallback, useState } from "react";

export default function useCropImage(resizedImage, setProfilePicture, setShow) {
  const [croppedImage, setCroppedImage] = useState(null);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = useCallback(
    (croppedArea, croppedAreaPixels) => {
      const image = new Image();
      image.src = resizedImage;

      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const maxSize = 400;

        const scaleFactor = image.width / image.naturalWidth;

        const x = croppedAreaPixels.x * scaleFactor;
        const y = croppedAreaPixels.y * scaleFactor;
        const width = croppedAreaPixels.width * scaleFactor;
        const height = croppedAreaPixels.height * scaleFactor;

        if (width > maxSize) {
          width = maxSize;
          height = (maxSize / croppedAreaPixels.width) * croppedAreaPixels.height;
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(image, x, y, width, height, 0, 0, width, height);

        const croppedImageUrl = canvas.toDataURL("image/jpeg");
        setCroppedImage(croppedImageUrl);
      };
    },
    [resizedImage]
  );

  function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
    return blob;
  }

  const onSaveCroppedImage = () => {
    const formData = new FormData();
    formData.append("picture", dataURItoBlob(croppedImage));

    fetch(postProfilePicture, {
      credentials: "include",
      method: "POST",
      body: formData
    })
      .then((res) => res.json())
      .then((res) => {
        setProfilePicture(res.imageName);
        setShow(false);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return {
    crop,
    setCrop,
    zoom,
    setZoom,
    onCropComplete,
    onSaveCroppedImage
  };
}
