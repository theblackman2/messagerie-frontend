import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import appState from "../utils/state";
import axios from "axios";
import { conversationsRoute } from "../utils/apiRoutes";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { AiFillCamera } from "react-icons/ai";
import { IoSend } from "react-icons/io5";
import Sending from "./Sending";
import Message from "./Message";

function ChatSection() {
  const { selectedConversation, logedUser } = useContext(appState);
  const [conversation, setConversation] = useState({});
  const [loading, setLoading] = useState(true);
  const [formInfos, setFormInfos] = useState({
    text: "",
  });
  const [sending, setSending] = useState(false);
  const messageEndRef = useRef();

  const scrollToBottom = (smooth) => {
    messageEndRef.current?.scrollIntoView({
      behavior: smooth ? "smooth" : "auto",
    });
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (formInfos.text) {
      setSending(true);
      const message = {
        sender: selectedConversation.id,
        text: formInfos.text,
      };
      const sendRoute = `${conversationsRoute}/message`;
      const sent = axios({
        method: "post",
        url: sendRoute,
        headers: {
          Authorization: logedUser.token,
        },
        data: {
          id: conversation._id,
          message: message,
        },
      });

      sent
        .then((response) => {
          scrollToBottom(true);
          setFormInfos((prevState) => ({ ...prevState, text: "" }));
          setSending(false);
        })
        .catch((err) => console.error(err));
    }
  };

  const handleTypeMessage = (e) => {
    const { name, value } = e.target;
    setFormInfos((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    const route = conversationsRoute;
    const token = logedUser.token;
    if (selectedConversation.id) {
      setLoading(true);
      setConversation({});
      const conversation = axios({
        method: "post",
        url: route,
        headers: {
          Authorization: token,
        },
        data: {
          participants: [logedUser.id, selectedConversation.id],
        },
      });

      conversation
        .then((response) => {
          setConversation(response.data);
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  }, [selectedConversation, logedUser]);

  useEffect(() => {
    scrollToBottom(true);
  }, [conversation.messages]);
  return (
    <Container>
      {selectedConversation.id ? (
        <>
          <div className="conversation-head">
            <img
              src={selectedConversation.imageUrl}
              alt={`${selectedConversation.name} avatar`}
              className="conversation-avatar"
            />
            <div className="conversation-name">
              <h3 className="name">{selectedConversation.name}</h3>
            </div>
          </div>
          <div className="conversation-body">
            {loading ? (
              <LoadingMessages>Chargement des messages</LoadingMessages>
            ) : conversation.messages.length <= 0 ? (
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
                {conversation.messages.map((message, index) => {
                  const text = message.text;
                  const mine = message.sender === logedUser.id;
                  const stamps = message.createdAt;
                  const stampsArray = stamps.split("T");
                  const date = stampsArray[0].split("-").reverse().join("/");
                  const time = stampsArray[1].split(".")[0];
                  const finalDate = `Le ${date} à ${time}`;
                  return (
                    <Message
                      key={index}
                      text={text}
                      mine={mine}
                      date={finalDate}
                    />
                  );
                })}
              </div>
            )}
            <div ref={messageEndRef} />
          </div>
          <div className="conversation-foot">
            <form onSubmit={handleSend}>
              <div className="inputs">
                <input
                  placeholder="Ecrire un message"
                  autoFocus
                  type="text"
                  name="text"
                  value={formInfos.text}
                  onChange={handleTypeMessage}
                />
                <div>
                  <button>
                    <BsFillEmojiSmileFill />
                  </button>
                  <button>
                    <AiFillCamera />
                  </button>
                </div>
              </div>
              <button className="send" type="submit">
                {sending ? <Sending /> : <IoSend />}
              </button>
            </form>
          </div>
        </>
      ) : (
        <NoChat>
          <div className="text">Choisissez une conversation</div>
          <img
            className="illustration"
            src="/man-floor.png"
            alt="Man on chair"
          />
        </NoChat>
      )}
    </Container>
  );
}

export default ChatSection;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 1rem;
  position: relative;

  .conversation-body {
    overflow-y: scroll;
    max-height: calc(100% - 130px);
    padding: 1rem 0;

    .messages {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  }

  .conversation-head {
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
  }

  .conversation-foot {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    height: 60px;
    display: flex;
    align-items: center;
    border-top: 2px solid #ccc;
    padding: 0 2rem;
    background-color: white;
    z-index: 10;
    border-radius: inherit;

    form {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .inputs {
        width: calc(90% - 16px);
        border-radius: 10px;
        background-color: #d9d9d9;
        padding: 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        > div {
          width: 10%;
          display: flex;
          align-items: center;
          justify-content: space-between;

          svg {
            color: white;
            font-size: 20px;
          }
        }

        input {
          width: 88%;
        }
      }

      .send {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        background-color: #d9d9d9;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        transition: 0.3s;

        > div {
          width: 100%;
          height: 100%;
        }

        svg {
          font-size: 20px;
        }

        :hover {
          color: blue;
        }
      }
    }
  }
`;

export const NoChat = styled.div`
  width: 100%;
  height: 100%;
  border-radius: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 2rem;
  gap: 1rem;

  .illustration {
    width: 150px;
    height: auto;
  }

  .text {
    font-weight: bold;
    text-align: center;
  }
`;

const LoadingMessages = styled.div``;
