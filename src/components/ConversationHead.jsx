import React from "react";
import styled from "styled-components";
import CloudinaryImage from "./CloudinaryImage";

function ConversationHead({ imageUrl, name }) {
  return (
    <Container>
      {imageUrl === "/uknown.png" ? (
        <img
          src={imageUrl}
          alt={`${name} avatar`}
          className="conversation-avatar"
        />
      ) : (
        <CloudinaryImage
          className="conversation-avatar"
          width={60}
          publicId={imageUrl}
        />
      )}
      <div className="conversation-name">
        <h3 className="name">{name}</h3>
      </div>
    </Container>
  );
}

export default ConversationHead;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  width: 100%;
  border-bottom: 2px solid #ccc;
  position: relative;

  .conversation-avatar {
    width: 60px;
    border-radius: 50%;
    height: 60px;
    position: absolute;
    top: 10px;
    left: 1rem;
  }
`;
