import React from "react";
import { Image } from "cloudinary-react";

function CloudinaryImage({ publicId, width, className, handleClick }) {
  return (
    <Image
      onClick={handleClick}
      publicId={publicId}
      width={width}
      className={className}
      cloudName={process.env.REACT_APP_CLOUD_NAME}
    />
  );
}

export default CloudinaryImage;
