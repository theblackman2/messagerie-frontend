import React, { useContext } from "react";
import styled from "styled-components";
import appState from "../utils/state";
import Recent from "./Recent";
import { NoChat } from "./ChatSection";

function Recents() {
  const { setShowContacts, conversations } = useContext(appState);

  return (
    <Container>
      <h2 className="recents-title">Récents</h2>
      {conversations.length > 0 ? (
        conversations.map((recent, index) => {
          // eslint-disable-next-line
          if (recent.messages.length <= 0) return;
          return <Recent key={index} recent={recent} />;
        })
      ) : (
        <NoChat>
          <p className="text">Aucune conversation</p>
          <button
            onClick={() => setShowContacts(true)}
            className="btn btn-primary"
          >
            Commencer à chatter
          </button>
        </NoChat>
      )}
    </Container>
  );
}

export default Recents;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 20px;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow-y: scroll;
  position: relative;

  .recents-title {
    padding: 1rem 0;
    background-color: white;
    position: sticky;
    top: 0;
    z-index: 10;
    left: 0;
    width: 100%;
  }
`;
