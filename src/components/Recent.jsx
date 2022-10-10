import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import appState from "../utils/state";
import axios from "axios";
import { usersRoute } from "../utils/apiRoutes";
import { ContactLoader } from "./Contacts";

function Recent({ recent }) {
  const { logedUser, setSelectedConversation } = useContext(appState);
  const [recentMessage, setRecentMessage] = useState(
    recent.messages[recent.messages.length - 1]
  );
  const [contact, setContact] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setRecentMessage(recent.messages[recent.messages.length - 1]);
    const contactId = recent.participants.filter(
      (participant) => participant !== logedUser.id
    )[0];
    const route = `${usersRoute}/${contactId}`;
    const user = axios({
      method: "get",
      url: route,
      headers: {
        Authorization: logedUser.token,
      },
    });
    user
      .then((response) => setContact(response.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [recent, logedUser]);

  return loading ? (
    <ContactLoader>
      <div className="contact"></div>
    </ContactLoader>
  ) : (
    <Container
      onClick={() =>
        setSelectedConversation({
          id: contact._id,
          imageUrl: contact.imageUrl ? contact.imageUrl : "/uknown.png",
          name: contact.pseudo,
        })
      }
    >
      <img
        src={contact.imageUrl ? contact.imageUrl : "/uknown.png"}
        alt={`${contact.pseudo} avatar`}
        className="avatar"
      />
      <div className="recent-infos">
        <h4 className="recent-name">{contact.pseudo}</h4>
        <p className="recent-message">
          {recentMessage.sender === logedUser.id && "Vous: "}
          {recentMessage.text.substring(0, 20)}
          {recentMessage.text.length > 19 && "..."}
        </p>
      </div>
    </Container>
  );
}

export default Recent;

const Container = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  min-height: 60px;

  .avatar {
    width: 50px;
    height: 50px;
  }

  .recent-infos {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
`;
