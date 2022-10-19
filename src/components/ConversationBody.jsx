import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { scrollToBottom } from "../utils/functions";
import Message from "./Message";
import { GrLinkBottom } from "react-icons/gr";
import { NoChat } from "./ChatSection";
import appState from "../utils/state";

function ConversationBody({ creating, messages }) {
  const { logedUser } = useContext(appState);
  const messageEndRef = useRef();
  useEffect(() => {
    scrollToBottom(messageEndRef, true);
  }, [messages]);
  return (
    <Container>
      {creating ? (
        <div>Creating conversation</div>
      ) : messages.length <= 0 ? (
        <NoChat>
          <div className="text">Aucun message, faites le premier pas</div>
          <img
            src="/animated-send.gif"
            alt="Man on floor"
            className="illustration"
          />
        </NoChat>
      ) : (
        <div className="messages">
          {messages.map((message, index) => {
            const text = message.text;
            const mine = message.sender === logedUser.id;
            const stamps = message.createdAt;
            const stampsArray = stamps.split("T");
            const date = stampsArray[0].split("-").reverse().join("/");
            const time = stampsArray[1].split(".")[0];
            const finalDate = `Le ${date} à ${time}`;
            const image = message.imageUrl;
            return (
              <Message
                key={index}
                text={text}
                mine={mine}
                date={finalDate}
                image={image}
              />
            );
          })}
        </div>
      )}
      <button
        onClick={() => scrollToBottom(messageEndRef, true)}
        className="go-bottom"
      >
        <GrLinkBottom />
      </button>
      <div ref={messageEndRef} />
    </Container>
  );
}

export default ConversationBody;

const Container = styled.div`
  overflow-y: scroll;
  max-height: calc(100% - 130px);
  padding: 1rem 0;

  .go-bottom {
    position: absolute;
    bottom: 80px;
    font-weight: bold;
    font-size: 20px;
    right: 1rem;
    z-index: 20;
  }

  .messages {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
`;
