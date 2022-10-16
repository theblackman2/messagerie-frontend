import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import appState from "../utils/state";

function ChangeSettings({ type, cancel }) {
  const { logedUser } = useContext(appState);
  const pseudoRef = useRef();
  useEffect(() => {
    if (type !== "pseudo") return;
    pseudoRef.current.value = logedUser.pseudo;
  }, [type, logedUser]);
  return (
    <Container>
      {type === "pseudo" && (
        <form onReset={cancel}>
          <input className="form-control" ref={pseudoRef} type="text" />
          <div className="btns">
            <button type="reset" className="btn btn-danger">
              Annuler
            </button>
            <button type="submit" className="btn btn-primary">
              Enregistrer
            </button>
          </div>
        </form>
      )}
    </Container>
  );
}

export default ChangeSettings;

const Container = styled.div`
  width: 90%;
  height: 300px;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: calc(50% - 150px);
  left: 5%;
  background-color: #ccc;
`;
