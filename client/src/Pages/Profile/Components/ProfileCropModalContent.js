import Cropper from "react-easy-crop";
import useCropImage from "../Hooks/useCropImage";
import useGetImage from "../Hooks/useGetImage";

export default function ProfileCropModalContent({ setShow, setProfilePicture }) {
  const { resizedImage, onFileChange } = useGetImage();

  const { crop, setCrop, zoom, setZoom, onCropComplete, onSaveCroppedImage } = useCropImage(
    resizedImage,
    setProfilePicture,
    setShow
  );

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
      <div className="image-crop-button-container">
        <label htmlFor="select-profile-picture" className="primary-button select-file">
          Select profile picture
        </label>
        <input
          className="select-profile-picture-button"
          id="select-profile-picture"
          type="file"
          accept=".jpg,.png.jpeg"
          onChange={onFileChange}
        />
        <button className="primary-button" disabled={!resizedImage} onClick={onSaveCroppedImage}>
          save
        </button>
        <button className="secondary-button" onClick={() => setShow(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
}
