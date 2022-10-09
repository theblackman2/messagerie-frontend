import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Chats from "./pages/Chats";
import appState from "./utils/state";

function App() {
  const [logedIn, setLogedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [logedUser, setLogedUser] = useState({});
  const [showContacts, setShowContacts] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState({
    id: "",
    imageUrl: "",
    name: "",
  });

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

  return loading ? (
    <div>Loading</div>
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
