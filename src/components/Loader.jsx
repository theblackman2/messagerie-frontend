import React from "react";
import styled from "styled-components";

function Loader() {
  return (
    <Container>
      <span className="loader"></span>
    </Container>
  );
}

export default Loader;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .loader {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: inline-block;
    position: relative;
    border: 3px solid;
    border-color: #000 #000 transparent transparent;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }
  .loader::after,
  .loader::before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    border: 3px solid;
    border-color: transparent transparent #ff3d00 #ff3d00;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    box-sizing: border-box;
    animation: rotationBack 0.5s linear infinite;
    transform-origin: center center;
  }
  .loader::before {
    width: 32px;
    height: 32px;
    border-color: #000 #000 transparent transparent;
    animation: rotation 1.5s linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes rotationBack {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(-360deg);
    }
  }
`;
