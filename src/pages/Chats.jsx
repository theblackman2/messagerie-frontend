import React, { useContext, useState } from "react";
// import appState from "../utils/state";
import styled from "styled-components";
import ChatSection from "../components/ChatSection";
import ContactsSection from "../components/ContactsSection";
import Error from "../components/Error";
import Sidebar from "../components/Sidebar";
import { AiFillCloseCircle } from "react-icons/ai";
import appState from "../utils/state";

function Chats({ notification }) {
  const [error, setError] = useState(false);
  const { closeNotification } = useContext(appState);

  const closeError = () => setError(false);
  return (
    <Container>
      {error && (
        <div className="error-handle">
          <Error close={closeError} />
        </div>
      )}
      {notification && (
        <Notification>
          <div className="content">
            <button onClick={closeNotification} className="close">
              <AiFillCloseCircle />
            </button>
            {notification}
          </div>
        </Notification>
      )}
      <div className="side-bar">
        <Sidebar />
      </div>
      <div className="contacts-section">
        <ContactsSection />
      </div>
      <div className="chat-section">
        <ChatSection />
      </div>
    </Container>
  );
}

export default Chats;

const Container = styled.div`
  padding: 1.5rem;
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  display: flex;
  gap: 1rem;
  background-color: #eaeaea;

  .side-bar {
    width: 20%;
  }

  .contacts-section {
    width: 30%;
  }

  .chat-section {
    width: 50%;
  }

  .error-handle {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const Notification = styled.div`
  position: absolute;
  top: 1.5rem;
  left: calc(50% - 150px);
  z-index: 20;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
  width: 300px;
  height: 100px;
  background-color: white;

  .content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    position: relative;

    .close {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 20px;
    }
  }
`;
