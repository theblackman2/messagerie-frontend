import React from "react";
import styled from "styled-components";
import { RiCloseCircleFill } from "react-icons/ri";

function ImagePreview({ image, cancel }) {
  return (
    <Container>
      <div className="content">
        <div onClick={cancel} className="cancel-img">
          <RiCloseCircleFill />
        </div>
        <img src={image} alt="Preview" />
      </div>
    </Container>
  );
}

export default ImagePreview;

const Container = styled.div`
  width: 100%;
  height: 200px;
  position: absolute;
  top: -205px;
  left: 0;

  .content {
    position: relative;
    width: 100%;
    height: 100%;

    .cancel-img {
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 20;
      padding: 5px;
      border-radius: 10px;
      cursor: pointer;
      background-color: black;
      color: white;

      svg {
        color: white;
        font-size: 25px;
      }
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;
