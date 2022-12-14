import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import appState from "../utils/state";
import { AiFillMessage } from "react-icons/ai";
import { MdContactPage } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import CloudinaryImage from "./CloudinaryImage";

function Sidebar() {
  const {
    logedUser,
    setLogedIn,
    showContacts,
    setShowContacts,
    socket,
    setSetting,
    screenDimensions,
  } = useContext(appState);
  const disconnect = () => {
    localStorage.clear();
    setLogedIn(false);
    window.location.reload();
  };

  // eslint-disable-next-line
  useEffect(() => {
    // eslint-disable-next-line
    socket.current.emit("add-user", logedUser.id);

    // eslint-disable-next-line
  }, []);

  return (
    <Container dimensions={screenDimensions} showContacts={showContacts}>
      <div className="sidebar-top">
        {!logedUser.imageUrl && (
          <img
            onClick={() => setSetting(true)}
            className="user-avatar"
            src={"/uknown.png"}
            alt={`${logedUser.pseudo} avatar`}
          />
        )}
        {logedUser.imageUrl && (
          <CloudinaryImage
            className="user-avatar"
            handleClick={() => setSetting(true)}
            width={screenDimensions.width > 900 ? 100 : 80}
            publicId={logedUser.imageUrl}
          />
        )}
        <div className="switches">
          <button
            onClick={() => setShowContacts(false)}
            className="switch messages-switch"
          >
            <AiFillMessage />
          </button>
          <button
            onClick={() => setShowContacts(true)}
            className="switch contacts-switch"
          >
            <MdContactPage />
          </button>
        </div>
      </div>
      <div className="sidebar-bottom">
        <button onClick={disconnect} className="logout-btn">
          <IoLogOut />
        </button>
      </div>
    </Container>
  );
}

export default Sidebar;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem 0;
  background-color: #1966ff;
  border-radius: 20px;
  align-items: center;

  .sidebar-top {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    .user-avatar {
      width: ${({ dimensions }) => (dimensions.width > 900 ? "100px" : "60px")};
      height: ${({ dimensions }) =>
        dimensions.width > 900 ? "100px" : "60px"};
      border-radius: 50%;
      cursor: pointer;
    }

    .switches {
      display: flex;
      width: 100%;
      flex-direction: column;
      align-items: flex-end;
      justify-content: flex-end;
      gap: 0.5rem;

      .switch {
        padding: 15px 35px;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        background-color: #004be1;
        position: relative;

        ::after {
          content: "";
          position: absolute;
          display: block;
          width: 6px;
          height: 100%;
          top: 0;
          right: 0;
        }

        svg {
          color: white;
          font-size: 25px;
          transition: 0.3s;

          :hover {
            color: #28282e;
          }
        }
      }

      .messages-switch::after {
        background-color: ${({ showContacts }) =>
          showContacts ? "transparent" : "#ffe921"};
      }

      .contacts-switch::after {
        background-color: ${({ showContacts }) =>
          !showContacts ? "transparent" : "#ffe921"};
      }
    }
  }

  .sidebar-bottom {
    svg {
      font-size: 35px;
      color: white;
      transition: 0.3s;

      :hover {
        color: #28282e;
      }
    }
  }

  @media (max-width: 900px) {
    height: 80px;
    flex-direction: row;

    .sidebar-top {
      width: fit-content;
      flex-direction: row;
      gap: 0.6rem;

      .switches {
        flex-direction: row;
        gap: 0.5rem;

        .switch {
          transform: rotate(90deg);
          padding: 10px 20px;

          svg {
            transform: rotate(-90deg);
          }
        }
      }
    }
  }
`;
