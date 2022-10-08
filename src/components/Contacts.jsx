import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { usersRoute } from "../utils/apiRoutes";
import axios from "axios";
import appState from "../utils/state";
import Contact from "./Contact";

function Contacts() {
  const { logedUser } = useContext(appState);
  const [contacts, setContacts] = useState([]);
  const [loadingContacts, setLoadingContacts] = useState(true);
  useEffect(() => {
    const token = logedUser.token;
    const users = axios({
      method: "get",
      url: usersRoute,
      headers: {
        Authorization: token,
      },
    });

    users
      .then((response) => setContacts(response.data))
      .catch((err) => console.log(err))
      .finally(() => setLoadingContacts(false));
  }, [logedUser.token]);
  return (
    <Container>
      {loadingContacts ? (
        <ContactLoader>
          <div className="contact"></div>
          <div className="contact"></div>
          <div className="contact"></div>
          <div className="contact"></div>
          <div className="contact"></div>
          <div className="contact"></div>
          <div className="contact"></div>
          <div className="contact"></div>
        </ContactLoader>
      ) : (
        contacts.map((contact, index) => (
          <Contact key={index} contact={contact} />
        ))
      )}
    </Container>
  );
}

export default Contacts;

const Container = styled.div`
  width: 100%;
  height: 100%;
  max-height: 100%;
  overflow-y: scroll;
  background-color: white;
  border-radius: 20px;
  padding: 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ContactLoader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  .contact {
    width: 100%;
    height: 70px;
    background-color: rgba(197, 193, 193, 0.5);
    border-radius: 15px;
    position: relative;
    overflow: hidden;
  }
  .contact:after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    transform: translateX(-100px);
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.5),
      transparent
    );
    animation: loading 0.8s infinite;
  }
  @keyframes loading {
    100% {
      transform: translateX(100%);
    }
  }
`;
