import React from "react";
import styled from "styled-components";

function Contact({ chat }) {
  return (
    <Container>
      <img
        src={chat.imageUrl ? chat.imageUrl : "/uknown.png"}
        alt={`${chat.pseudo} avatar`}
        className="contact-avatar"
      />
      <div className="chat-infos">
        <h4 className="chat-name">{chat.name}</h4>
        <p className="chat-last-message">{chat.lastMessage}</p>
      </div>
    </Container>
  );
}

export default Contact;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;
