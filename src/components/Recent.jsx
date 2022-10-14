import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import appState from "../utils/state";

function Recent({ recent }) {
  const { logedUser, setSelectedConversation, socket, sentMessage } =
    useContext(appState);
  const [recentMessage, setRecentMessage] = useState(
    recent.messages[recent.messages.length - 1]
  );

  const contact = recent.participants.filter(
    (participant) => participant._id !== logedUser.id
  )[0];

  useEffect(() => {
    socket.current.on("receive", (data) => {
      if(data.message.sender !== contact._id) return
      setRecentMessage(data.message);
    });
  }, [socket, contact]);

  useEffect(() => {
    if (!sentMessage) return;
    const to = sentMessage.to;
    if (to === contact._id) setRecentMessage(sentMessage.message);
  }, [sentMessage, contact._id]);

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
