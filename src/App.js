import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Error from "./components/Error";
import Auth from "./pages/Auth";
import Chats from "./pages/Chats";
import appState from "./utils/state";
import { io } from "socket.io-client";
import axios from "axios";
import { usersRoute } from "./utils/apiRoutes";

function App() {
  // store all users and recent conversations
  const [conversations, setConversations] = useState([])
  const [loadingConversations, setLoadingConversations] = useState(true)
  const [users, setUsers] = useState([])
  const [loadingUsers, setLoadingUsers] = useState(true)


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

  useEffect(() => {
    const host = process.env.REACT_APP_API_URL;
    socket.current = io(host);
  }, []);

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

  useEffect(() => {
    if (!logedIn) return
    const usersApiUrl = usersRoute
    const users = axios({
      method: "get",
      url: usersApiUrl,
      headers: {
        Authorization: logedUser.token,
      }
    })

    users.then((response) => {
      setUsers(response.data)
      console.log(response)
    }).catch(() => {
      setError(true)
    }).finally(() => setLoadingUsers(false))
  }, [logedUser])

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
        sentMessage,
        setSentMessage,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={logedIn ? <Chats /> : <Auth />} />
        </Routes>
      </BrowserRouter>
    </appState.Provider>
  );
}

export default App;
