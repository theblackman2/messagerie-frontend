import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import CloudinaryImage from "./CloudinaryImage";
import { BsFillCloudDownloadFill } from "react-icons/bs";

function ViewImage({ image, cancel }) {
  return (
    <Container>
      <div className="content">
        <div className="btns">
          <button className="download-btn">
            <BsFillCloudDownloadFill />
          </button>
          <button onClick={cancel} className="close">
            <AiOutlineClose />
          </button>
        </div>
        <CloudinaryImage publicId={image} width="100%" className="show-image" />
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
