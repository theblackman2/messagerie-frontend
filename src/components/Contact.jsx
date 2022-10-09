import React, { useContext } from "react";
import styled from "styled-components";
import appState from "../utils/state";

function Contact({ contact }) {
  const { setSelectedConversation } = useContext(appState);
  return (
    <Container
      onClick={() =>
        setSelectedConversation({
          id: contact._id,
          imageUrl: contact.imageUrl ? contact.imageUrl : "/uknown.png",
          name: contact.pseudo,
        })
      }
    >
      <div className="contact">
        <img
          src={contact.imageUrl ? contact.imageUrl : "/uknown.png"}
          alt={`${contact.pseudo} avatar`}
          className="contact-avatar"
        />
        <h4 className="contact-name">{contact.pseudo}</h4>
      </div>
    </Container>
  );
}

export default Contact;

const Container = styled.div`
  height: 70px;
  cursor: pointer;

  .contact {
    display: flex;
    align-items: center;
    gap: 15px;
    height: 100%;

    .contact-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }

  ::after {
    content: "";
    display: block;
    width: 100%;
    height: 2px;
    background-color: #ccc;
    margin-top: 10px;
  }
`;