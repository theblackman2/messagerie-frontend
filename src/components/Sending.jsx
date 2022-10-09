import React from "react";
import styled from "styled-components";

function Sending() {
  return (
    <Container>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </Container>
  );
}

export default Sending;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 25px;
  height: 25px;
  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 20px;
    height: 20px;
    /* margin: 8px; */
    border: 5px solid #fff;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #fff transparent transparent transparent;
    :nth-child(1) {
      animation-delay: -0.45s;
    }
    :nth-child(2) {
      animation-delay: -0.3s;
    }
    :nth-child(3) {
      animation-delay: -0.15s;
    }
    @keyframes lds-ring {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
`;
