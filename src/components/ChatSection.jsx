import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import appState from "../utils/state";
import axios from "axios";
import { conversationsRoute } from "../utils/apiRoutes";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { AiFillCamera } from "react-icons/ai";
import { IoSend } from "react-icons/io5";

function ChatSection() {
  const { selectedConversation, logedUser } = useContext(appState);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSend = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const route = conversationsRoute;
    const token = logedUser.token;
    if (selectedConversation.id) {
      setLoading(true);
      setMessages([]);
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
        .then((response) => setMessages(response.data.messages))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  }, [selectedConversation, logedUser]);
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
              <div>Les messages</div>
            )}
          </div>
          <div className="conversation-foot">
            <form onSubmit={handleSend}>
              <div className="inputs">
                <input
                  placeholder="Ecrire un message"
                  autoFocus
                  type="text"
                  name="message"
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
                <IoSend />
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
        width: calc(8% - 16px);
        border-radius: 10px;
        background-color: #d9d9d9;
        padding: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        transition: 0.3s;
        font-size: 20px;

        :hover {
          color: blue;
        }
      }
    }
  }
`;

const NoChat = styled.div`
  width: 100%;
  height: 100%;
  border-radius: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 2rem;

  .illustration {
    width: 150px;
    height: auto;
  }

  .text {
    font-weight: bold;
  }
`;

const LoadingMessages = styled.div``;
