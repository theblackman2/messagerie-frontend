import React, { useContext, useEffect, useState } from "react";
import appState from "../utils/state";
import axios from "axios";
import { usersRoute } from "../utils/apiRoutes";
import styled from "styled-components";
import Error from "../components/Error";
import Loader from "../components/Loader";

function Chats() {
  const { setLogedIn, logedUser } = useContext(appState);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);

  const closeError = () => setError(false);

  useEffect(() => {
    const users = axios({
      method: "get",
      url: usersRoute,
      headers: {
        Authorization: logedUser.token,
      },
    });

    users
      .then((response) => setUsers(response.data))
      .catch((err) => setError(true))
      .finally(() => setLoading(false));
  }, [logedUser]);

  const handleDisconnect = () => {
    localStorage.removeItem("user");
    setLogedIn(false);
  };
  return loading ? (
    <Loader />
  ) : (
    <Container>
      {error && (
        <div className="error-handle">
          <Error close={closeError} />
        </div>
      )}
      Bienvenue {logedUser.pseudo}{" "}
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
      </ul>
    </Container>
  );
}

export default Chats;

const Container = styled.div`
  .error-handle {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
  }
`;
