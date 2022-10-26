import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { scrollToBottom } from "../utils/functions";
import Message from "./Message";
import { AiOutlineArrowDown } from "react-icons/ai";
import { NoChat } from "./ChatSection";
import appState from "../utils/state";
import ViewImage from "./ViewImage";

function ConversationBody({ creating, messages }) {
  const [viewImage, setViewImage] = useState(null);
  const closeViewImage = () => setViewImage(null);
  const { logedUser, selectedConversation } = useContext(appState);
  useEffect(() => {
    closeViewImage();
  }, [selectedConversation]);
  const messageEndRef = useRef();
  useEffect(() => {
    scrollToBottom(messageEndRef, true);
  }, [messages]);
  return (
    <Container>
      {viewImage && <ViewImage cancel={closeViewImage} image={viewImage} />}
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
            const image = message.imageUrl;
            return (
              <Message
                view={setViewImage}
                key={index}
                text={text}
                mine={mine}
                // date={date}
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
        <AiOutlineArrowDown />
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
  /* position: absolute; */

  .go-bottom {
    position: absolute;
    bottom: 80px;
    font-weight: bold;
    font-size: 20px;
    right: 0.5rem;
    z-index: 20;
  }

  .messages {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
`;
