import React, { useContext } from "react";
// import appState from "../utils/state";
import styled from "styled-components";
import ChatSection from "../components/ChatSection";
import ContactsSection from "../components/ContactsSection";
import Sidebar from "../components/Sidebar";
import { AiFillCloseCircle } from "react-icons/ai";
import appState from "../utils/state";
import Settings from "../components/Settings";

function Chats({ notification }) {
  const { closeNotification, setting, screenDimensions } = useContext(appState);

  return (
    <Container dimensions={screenDimensions}>
      {setting && <Settings className="settings" />}
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
  padding: ${({ dimensions }) =>
    dimensions.width > 900 ? "1.5rem" : "0.5rem"};
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: ${({ dimensions }) =>
    dimensions.width > 900 ? "row" : "column"};
  gap: 1rem;
  background-color: #eaeaea;
  position: relative;

  .side-bar {
    width: ${(props) => (props.dimensions.width > 900 ? "20%" : "100%")};
  }

  .contacts-section {
    width: ${(props) => (props.dimensions.width > 900 ? "30%" : "100%")};
  }

  .chat-section {
    width: 50%;
  }

  @media (max-width: 900px) {
    .chat-section {
      display: none;
    }

    .chat-section {
      height: 100%;
    }
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
