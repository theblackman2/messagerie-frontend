import React from "react";
import styled from "styled-components";
import { RiCloseCircleFill } from "react-icons/ri";

function Error({ close }) {
  return (
    <Container>
      <div className="card">
        <button onClick={close} className="close-btn">
          <RiCloseCircleFill />
        </button>
        Une erreur s'est produite
      </div>
    </Container>
  );
}

export default Error;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);

  .card {
    width: 300px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-radius: 10px;
    position: relative;

    .close-btn {
      position: absolute;
      top: 1rem;
      right: 1rem;

      svg {
        font-size: 20px;
      }
    }
  }
`;
