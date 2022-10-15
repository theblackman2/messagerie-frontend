import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Error from "./components/Error";
import Auth from "./pages/Auth";
import Chats from "./pages/Chats";
import appState from "./utils/state";
import { io } from "socket.io-client";
import axios from "axios";
import { conversationsRoute, usersRoute } from "./utils/apiRoutes";
import {
  addContact,
  getConversationFromIds,
  updateConversations,
} from "./utils/functions";
import Loader from "./components/Loader";

function App() {
  // store all users and recent conversations
  const [conversations, setConversations] = useState(null);
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [users, setUsers] = useState(null);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [currentId, setCurrentId] = useState(null);
  const [creatingConversation, setCreatingConversation] = useState(false);
  const [logedIn, setLogedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [logedUser, setLogedUser] = useState({});
  const [showContacts, setShowContacts] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState({
    id: "",
    imageUrl: "",
    name: "",
  });
  const [error, setError] = useState(false);
  const socket = useRef();
  const [sentMessage, setSentMessage] = useState(null);
  const [newUser, setNewUser] = useState(null);
  const [notification, setNotification] = useState(null);

  // clear notification after 3 seconds
  useEffect(() => {
    if (!notification) return;
    const interval = setTimeout(() => {
      setNotification(null);
    }, 3000);

    return () => clearInterval(interval);
  }, [notification]);

  // update conversations after sent message
  useEffect(() => {
    if (!sentMessage) return;
    setConversations((prevState) =>
      updateConversations(sentMessage, prevState)
    );
    // eslint-disable-next-line
  }, [sentMessage]);

  // change conversation in chat section
  useEffect(() => {
    if (!currentId) return;
    setCurrentConversation(
      conversations.find((conversation) => conversation._id === currentId)
    );
  }, [currentId, conversations]);

  useEffect(() => {
    const host = process.env.REACT_APP_API_URL;
    socket.current = io(host, {
      transports: ["websocket"],
    });
  }, []);

  // set logedin status if there is user loged in
  useEffect(() => {
    setLoading(true);
    const user = localStorage.getItem("user");
    if (user) {
      setLogedUser(JSON.parse(user));
      setLogedIn(true);
    } else {
      setLogedIn(false);
    }
    setLoading(false);
  }, [logedIn]);

  // get all users once loged in
  useEffect(() => {
    if (!logedIn) return;
    setUsers([]);
    setLoadingUsers(true);
    const usersApiUrl = usersRoute;
    const users = axios({
      method: "get",
      url: usersApiUrl,
      headers: {
        Authorization: logedUser.token,
      },
    });

    users
      .then((response) => {
        setUsers(response.data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => setLoadingUsers(false));
  }, [logedUser, logedIn]);

  // get all recent conversations once loged in
  useEffect(() => {
    if (!logedIn) return;
    setConversations([]);
    setLoadingConversations(true);

    const conversations = axios({
      method: "get",
      url: `${conversationsRoute}/recents`,
      headers: {
        Authorization: logedUser.token,
      },
      params: {
        id: logedUser.id,
      },
    });

    conversations
      .then((response) => {
        setConversations(response.data);
        // console.log(response.data);
      })
      .catch(() => setError(true))
      .finally(() => setLoadingConversations(false));
  }, [logedUser, logedIn]);

  // get conversation from contacts
  useEffect(() => {
    if (!selectedConversation.id) return;
    if (!logedIn) return;
    const conversation = getConversationFromIds(
      logedUser.id,
      selectedConversation.id,
      conversations
    );
    if (conversation) setCurrentConversation(conversation);
    else {
      const route = conversationsRoute;
      setCreatingConversation(true);
      const createdConversation = axios({
        method: "post",
        url: route,
        headers: {
          Authorization: logedUser.token,
        },
        data: {
          participants: [logedUser.id, selectedConversation.id],
        },
      });

      createdConversation
        .then((response) =>
          setConversations((prevState) => [response.data, ...prevState])
        )
        .catch((error) => {
          console.log(error);
          setError(true);
        })
        .finally(() => setCreatingConversation(false));
    }
  }, [selectedConversation, conversations, logedIn, logedUser]);

  // update conversation after receive message
  useEffect(() => {
    socket.current.on("receive", (data) => {
      setConversations((prevState) => updateConversations(data, prevState));
      setNotification(`Nouveau message de ${data.sender}`);
    });
  }, [socket]);

  const closeNotification = () => setNotification(null);

  // store a new joined user
  useEffect(() => {
    socket.current.on("user-joined", (data) => {
      if (data.id === logedUser.id) return;
      setNewUser(data);
    });
  }, [socket, logedUser]);

  useEffect(() => {
    if (!newUser) return;
    setUsers((prevState) => addContact(newUser, prevState));
    setNotification(`${newUser.pseudo} a rejoint l'application`);
  }, [newUser]);

  return loading ? (
    <div>Loading</div>
  ) : error ? (
    <Error close={() => setError(false)} />
  ) : (
    <appState.Provider
      value={{
        setLogedIn,
        setLogedUser,
        logedIn,
        logedUser,
        showContacts,
        setShowContacts,
        selectedConversation,
        setSelectedConversation,
        setError,
        socket,
        setSentMessage,
        users,
        conversations,
        currentConversation,
        setCurrentId,
        creatingConversation,
        sentMessage,
        closeNotification,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              logedIn ? (
                loadingUsers || loadingConversations ? (
                  <Loader />
                ) : (
                  // <Loader />
                  <Chats notification={notification} />
                )
              ) : (
                <Auth />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </appState.Provider>
  );
}

export default App;
