import React, { useContext, useState } from "react";
import styled from "styled-components";
import { BiSearch } from "react-icons/bi";
import { FiMoreVertical } from "react-icons/fi";
import appState from "../utils/state";
import Contacts from "./Contacts";
import Recents from "./Recents";

function ContactsSection() {
  const { showContacts } = useContext(appState);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <Container>
      <div className="form-search">
        <div className="form-left">
          <BiSearch className="search-icon" />
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
            />
          </form>
        </div>
        <button className=".form-right">
          <FiMoreVertical className="more-icon" />
        </button>
      </div>
      <div className="contacts">
        {showContacts ? <Contacts /> : <Recents />}
      </div>
    </Container>
  );
}

export default ContactsSection;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #eaeaea;
  border-radius: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;

  .form-search {
    /* flex: 0 1 auto; */
    background-color: white;
    border-radius: inherit;
    display: flex;
    align-items: center;
    height: 50px;
    max-height: 50px;
    min-height: 50px;
    padding: 0 20px;
    width: calc(100%);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    .form-left {
      width: 90%;
      display: flex;
      align-items: center;
      gap: 10px;

      svg {
        width: 10%;
        font-size: 20px;
      }

      form {
        width: 90%;
      }
    }
  }

  .contacts {
    /* flex: 1 1 auto; */
    width: 100%;
    height: auto;
    height: 100%;
    /* min-height: calc(100% - 50px - 1rem); */
    border-radius: 20px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;
