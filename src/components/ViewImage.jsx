import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import CloudinaryImage from "./CloudinaryImage";
import { BsFillCloudDownloadFill } from "react-icons/bs";
import { useRef } from "react";
import { saveAs } from "file-saver";

function ViewImage({ image, cancel }) {
  const downloadRef = useRef();
  const downloadImage = () => {
    const url = downloadRef.current.element.current.src;
    saveAs(url, "image.jpg");
  };
  return (
    <Container>
      <div className="content">
        <div className="btns">
          <button onClick={downloadImage} className="download-btn">
            <BsFillCloudDownloadFill />
          </button>
          <button onClick={cancel} className="close">
            <AiOutlineClose />
          </button>
        </div>
        <CloudinaryImage
          reference={downloadRef}
          publicId={image}
          width="100%"
          className="show-image"
        />
      </div>
    </Container>
  );
}

export default ViewImage;

const Container = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 30;
  background-color: rgba(0, 0, 0, 0.5);

  .content {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    .show-image {
      width: 80%;
      height: 80%;
      object-fit: contain;
    }

    .btns {
      position: absolute;
      top: 1rem;
      right: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      font-size: 20px;
      color: white;
    }
  }
`;
