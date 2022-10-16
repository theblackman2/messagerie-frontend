import React, { useContext, useState } from "react";
import styled from "styled-components";
import appState from "../utils/state";
import { AiFillCloseCircle } from "react-icons/ai";
import ChangeSettings from "./ChangeSettings";

function Settings() {
  const { logedUser, setSetting } = useContext(appState);
  const [type, setType] = useState(null);
  const cancel = () => setType(null);
  return (
    <Container>
      <div className="card">
        {type && <ChangeSettings type={type} cancel={cancel} />}
        <button onClick={() => !type && setSetting(false)} className="close">
          <AiFillCloseCircle />
        </button>
        <h2 className="title">Paramètres</h2>
        <div className="set-col">
          <img
            width={100}
            height={100}
            src={logedUser.imageUrl ? logedUser.imageUrl : "/uknown.png"}
            alt={`${logedUser.pseudo} avatar`}
          />
          <button
            onClick={() => setType("profileImg")}
            className="btn btn-primary"
          >
            Modifier
          </button>
        </div>
        <div className="set">
          <h3>{logedUser.pseudo}</h3>
          <button onClick={() => setType("pseudo")} className="btn btn-primary">
            Modifier
          </button>
        </div>
        <button onClick={() => setType("password")} className="btn btn-danger">
          Modifier le mot de passe
        </button>
      </div>
    </Container>
  );
}

export default Settings;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 15;

  .card {
    width: 300px;
    height: 500px;
    background-color: white;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    padding: 3.5rem 2rem;
    position: relative;

    .close {
      position: absolute;
      top: 1rem;
      right: 1rem;
      font-size: 20px;
    }

    .set {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
    }

    .set-col {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 15px;
    }
  }
`;
