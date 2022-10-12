import React, { useContext } from "react";
import styled from "styled-components";
import appState from "../utils/state";

function Recent({ recent }) {
  const { logedUser, setSelectedConversation } = useContext(appState);
  const recentMessage = recent.messages[recent.messages.length - 1];
  const contact = recent.participants.filter(
    (participant) => participant._id !== logedUser.id
  )[0];

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
      <img
        src={contact.imageUrl ? contact.imageUrl : "/uknown.png"}
        alt={`${contact.pseudo} avatar`}
        className="avatar"
      />
      <div className="recent-infos">
        <h4 className="recent-name">{contact.pseudo}</h4>
        <p className="recent-message">
          {recentMessage.sender === logedUser.id && "Vous: "}
          {recentMessage.text.substring(0, 20)}
          {recentMessage.text.length > 19 && "..."}
        </p>
      </div>
    </Container>
  );
}

export default Recent;

const Container = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  min-height: 60px;

  .avatar {
    width: 50px;
    height: 50px;
  }

  .recent-infos {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
`;
