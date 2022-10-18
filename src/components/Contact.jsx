import React, { useContext } from "react";
import styled from "styled-components";
import appState from "../utils/state";
import { Image } from "cloudinary-react";

function Contact({ contact }) {
  const { setSelectedConversation } = useContext(appState);
  return (
    <Container
      onClick={() => {
        setSelectedConversation({
          id: contact._id ? contact._id : contact.id,
          imageUrl: contact.imageUrl ? contact.imageUrl : "/uknown.png",
          name: contact.pseudo,
        });
      }}
    >
      <div className="contact">
        {!contact.imageUrl && (
          <img
            src={"/uknown.png"}
            alt={`${contact.pseudo} avatar`}
            className="contact-avatar"
          />
        )}
        {contact.imageUrl && (
          <Image
            width="50"
            className="avatar"
            cloudName={process.env.REACT_APP_CLOUD_NAME}
            publicId={contact.imageUrl}
          />
        )}
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
