import React, { useState } from "react";
// import appState from "../utils/state";
import styled from "styled-components";
import ChatSection from "../components/ChatSection";
import ContactsSection from "../components/ContactsSection";
import Error from "../components/Error";
import Sidebar from "../components/Sidebar";

function Chats() {
  const [error, setError] = useState(false);

  const closeError = () => setError(false);
  return (
    <Container>
      {error && (
        <div className="error-handle">
          <Error close={closeError} />
        </div>
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
