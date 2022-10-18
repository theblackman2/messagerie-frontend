import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { usersRoute } from "../utils/apiRoutes";

import appState from "../utils/state";

function ChangeSettings({ type, cancel }) {
  const { logedUser, setLogedUser, setError } = useContext(appState);
  const imageRef = useRef();
  const pseudoRef = useRef();
  useEffect(() => {
    if (type !== "pseudo") return;
    pseudoRef.current.value = logedUser.pseudo;
  }, [type, logedUser]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewLink, setPreviewLink] = useState(null);

  useEffect(() => {
    if (!selectedFile) return setPreviewLink(null);
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      setPreviewLink(reader.result);
    };
  }, [selectedFile]);

  const changeProfilePicture = (e) => {
    e.preventDefault();
    if (!previewLink) return;
    const route = usersRoute;
    const changed = axios({
      method: "put",
      url: `${route}/profilePicture`,
      headers: {
        Authorization: logedUser.token,
      },
      data: {
        userId: logedUser.id,
        encodedFile: previewLink,
      },
    });

    changed
      .then((response) => {
        const newUser = { ...logedUser, imageUrl: response.data.data.imageUrl };
        localStorage.setItem("user", JSON.stringify(newUser));
        setLogedUser((prevState) => ({
          ...prevState,
          imageUrl: response.data.data.imageUrl,
        }));
        cancel();
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  };

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
      {type === "profileImg" && (
        <form
          onSubmit={changeProfilePicture}
          className="profile-form"
          onReset={cancel}
        >
          {previewLink && <img alt="preview" src={previewLink} width="100" />}
          <input
            ref={imageRef}
            type="file"
            name="profile"
            id="profile"
            accept="image/png, image/jpeg"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
          <div
            onClick={() => imageRef.current.click()}
            className="choose-btn btn btn-primary"
          >
            Choisir
          </div>
          <div className="btns">
            <button type="reset" className="btn btn-danger">
              Annuler
            </button>
            <button type="submit" className="btn btn-primary">
              Modifier
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

  .profile-form {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    gap: 20px;
    input {
      display: none;
    }

    .choose-btn {
      width: fit-content;
    }

    .btns {
      display: flex;
      gap: 10px;
      justify-content: space-around;
    }
  }
`;
