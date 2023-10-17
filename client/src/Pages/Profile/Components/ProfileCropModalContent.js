import Cropper from "react-easy-crop";
import useCropImage from "../Hooks/useCropImage";
import useGetImage from "../Hooks/useGetImage";

export default function ProfileCropModalContent({ setShow }) {
  const { resizedImage, onFileChange } = useGetImage();

  const { crop, setCrop, zoom, setZoom, onCropComplete, onSaveCroppedImage } =
    useCropImage(resizedImage);

  return (
    <div onClick={(e) => e.stopPropagation()} className="modal">
      {resizedImage ? (
        <div className="crop-container">
          <Cropper
            image={resizedImage}
            crop={crop}
            zoom={zoom}
            cropShape="round"
            objectFit="cover"
            aspect={4 / 4}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
      ) : null}
      <input type="file" accept=".jpg,.png.jpeg" onChange={onFileChange} />
      <div>
        <button onClick={onSaveCroppedImage}>save</button>
        <button onClick={() => setShow(false)}>Cancel</button>
      </div>
    </div>
  );
}
