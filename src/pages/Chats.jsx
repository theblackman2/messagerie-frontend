import React, { useState } from "react";
// import appState from "../utils/state";
// import axios from "axios";
// import { usersRoute } from "../utils/apiRoutes";
import styled from "styled-components";
import ChatSection from "../components/ChatSection";
import ContactsSection from "../components/ContactsSection";
import Error from "../components/Error";
// import Loader from "../components/Loader";
import Sidebar from "../components/Sidebar";

function Chats() {
  // const { setLogedIn, logedUser } = useContext(appState);
  // const [loading, setLoading] = useState(true);
  // const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);

  const closeError = () => setError(false);

  // useEffect(() => {
  //   const users = axios({
  //     method: "get",
  //     url: usersRoute,
  //     headers: {
  //       Authorization: logedUser.token,
  //     },
  //   });

  //   users
  //     .then((response) => setUsers(response.data))
  //     .catch((err) => setError(true))
  //     .finally(() => setLoading(false));
  // }, [logedUser]);

  // const handleDisconnect = () => {
  //   localStorage.removeItem("user");
  //   setLogedIn(false);
  // };
  // return loading ? (
  //   <Loader />
  // ) : (
  return (
    <Container>
      {error && (
        <div className="error-handle">
          <Error close={closeError} />
        </div>
      )}
      {/* Bienvenue {logedUser.pseudo}{" "}
      <button className="btn btn-danger" onClick={handleDisconnect}>
        Se déconnecter
      </button>
      <h2>Les utilisateurs de la plateforme</h2>
      <ul>
        {users.map((user, index) => {
          const pseudo = user.pseudo;
          // eslint-disable-next-line
          if (user._id === logedUser.id) return;
          return <li key={index}>{pseudo}</li>;
        })}
      </ul> */}
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
  // );
}

export default Chats;

const Container = styled.div`
  padding: 1.5rem;
  width: 100%;
  min-height: 100vh;
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
