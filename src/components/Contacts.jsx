import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { usersRoute } from "../utils/apiRoutes";
import axios from "axios";
import appState from "../utils/state";
import Contact from "./Contact";
import { NoChat } from "./ChatSection";

function Contacts() {
  const { logedUser } = useContext(appState);
  const [contacts, setContacts] = useState([]);
  const [loadingContacts, setLoadingContacts] = useState(true);
  const [copyinLink, setCopyingLink] = useState(false);

  const copyLink = () => {
    const link = window.location.href;
    navigator.clipboard.writeText(link);
    setCopyingLink(true);
    setTimeout(() => {
      setCopyingLink(false);
    }, 3000);
  };
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
      ) : contacts.length > 1 ? (
        contacts.map((contact, index) => {
          // eslint-disable-next-line
          if (contact._id === logedUser.id) return;
          return <Contact key={index} contact={contact} />;
        })
      ) : (
        <NoChat>
          <p className="text">
            Il n'ya personne <br /> Invitez vos amis à vous réjoindre avec le
            lien
          </p>
          <button onClick={copyLink} className="btn btn-primary">
            {copyinLink ? "Lien copié" : "Copier le lien"}
          </button>
          <img className="illustration" src="/Sad.png" alt="Sad girl" />
        </NoChat>
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
