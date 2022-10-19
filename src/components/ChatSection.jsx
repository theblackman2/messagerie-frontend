import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import appState from "../utils/state";
import axios from "axios";
import { conversationsRoute } from "../utils/apiRoutes";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { AiFillCamera } from "react-icons/ai";
import { IoSend } from "react-icons/io5";
import Sending from "./Sending";
import { scrollToBottom } from "../utils/functions";
import EmojiPicker from "emoji-picker-react";
import ImagePreview from "./ImagePreview";
import ConversationHead from "./ConversationHead";
import ConversationBody from "./ConversationBody";

function ChatSection() {
  const {
    selectedConversation,
    logedUser,
    socket,
    currentConversation,
    creatingConversation,
    setSentMessage,
    setError,
  } = useContext(appState);
  const [sending, setSending] = useState(false);
  const [messages, setMessages] = useState([]);
  const [pickingEmoji, setPickingEmoji] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewLink, setPreviewLink] = useState(null);

  // store messages when selected a conversation
  useEffect(() => {
    if (!currentConversation) return;
    setMessages(currentConversation.messages);
  }, [currentConversation]);

  // store the text in message input
  const messageRef = useRef();

  // store a choosen image
  const imageRef = useRef();

  const cancelImage = () => {
    imageRef.current.value = "";
    setSelectedFile(null);
  };

  const handleSend = (e) => {
    e.preventDefault();
    setPickingEmoji(false);
    if (!messageRef.current.value && !imageRef.current.value) return;
    setSending(true);
    const message = {
      sender: logedUser.id,
      text: messageRef.current.value ? messageRef.current.value : "",
      imageUrl: previewLink ? previewLink : "",
    };
    const sendRoute = `${conversationsRoute}/message`;
    const sent = axios({
      method: "put",
      url: sendRoute,
      headers: {
        Authorization: logedUser.token,
      },
      data: {
        id: currentConversation._id,
        message: message,
      },
    });

    sent
      .then((response) => {
        const message = response.data.data;
        scrollToBottom(true);
        messageRef.current.value = "";
        cancelImage();
        setSending(false);
        socket.current.emit("send-msg", {
          sender: logedUser.pseudo,
          conversation: currentConversation._id,
          to: selectedConversation.id,
          message: message,
        });
        setMessages((prevState) => [...prevState, message]);
        setSentMessage({
          conversationId: currentConversation._id,
          message: message,
        });
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      });
  };

  useEffect(() => {
    if (!selectedFile) return setPreviewLink(null);
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      setPreviewLink(reader.result);
    };
  }, [selectedFile]);

  return (
    <Container>
      {currentConversation ? (
        <>
          <ConversationHead
            imageUrl={selectedConversation.imageUrl}
            name={selectedConversation.name}
          />
          <ConversationBody
            creating={creatingConversation}
            messages={messages}
          />
          <div className="conversation-foot">
            <form onSubmit={handleSend}>
              {previewLink && (
                <ImagePreview cancel={cancelImage} image={previewLink} />
              )}
              {pickingEmoji && (
                <div className="emoji-pick">
                  <EmojiPicker
                    onEmojiClick={(emoji) =>
                      (messageRef.current.value += emoji.emoji)
                    }
                    height={350}
                    width={300}
                  />
                </div>
              )}
              <div className="inputs">
                <input
                  placeholder="Ecrire un message"
                  autoFocus
                  type="text"
                  name="text"
                  ref={messageRef}
                />
                <input
                  ref={imageRef}
                  type="file"
                  accept="image/png, image/jpeg"
                  name="image"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  className="image-input"
                />
                <div>
                  <div
                    className="emoji-btn"
                    onClick={() => setPickingEmoji((prevState) => !prevState)}
                  >
                    <BsFillEmojiSmileFill />
                  </div>
                  <div className="camera-btn">
                    <AiFillCamera onClick={() => imageRef.current.click()} />
                  </div>
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
      position: relative;

      .emoji-btn,
      .camera-btn {
        cursor: pointer;
      }

      .emoji-pick {
        position: absolute;
        top: -350px;
        right: 0;
      }

      .inputs {
        width: calc(90% - 16px);
        border-radius: 10px;
        background-color: #d9d9d9;
        padding: 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .image-input {
          display: none;
        }

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
