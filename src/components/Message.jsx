import React from "react";
import styled from "styled-components";

function Message({ image, text, mine, date }) {
  return (
    <Container mine={mine}>
      <div className="text">
        {text}
        <span className="dir"></span>
      </div>
      <p className="date">{date}</p>
    </Container>
  );
}

export default Message;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: fit-content;
  max-width: 80%;
  margin-left: ${({ mine }) => (mine ? "auto" : "20px")};
  margin-right: ${({ mine }) => (!mine ? "auto" : "20px")};
  .text {
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background-color: ${({ mine }) => (!mine ? "#CFCFCF" : "#1966FF")};
    color: ${({ mine }) => (!mine ? "black" : "white")};
    border-radius: 10px;
    font-size: 14px;
    line-height: 1.3em;

    .dir {
      display: block;
      position: absolute;
      width: 20px;
      height: 15px;
      background-color: ${({ mine }) => (mine ? "#1966FF" : "#CFCFCF")};
      right: ${({ mine }) => (mine ? "-7px" : "")};
      left: ${({ mine }) => (!mine ? "-7px" : "")};
      border-top-left-radius: ${({ mine }) => (!mine ? "25px" : "0")};
      border-top-right-radius: ${({ mine }) => (mine ? "25px" : "0")};
      bottom: 0;
    }
  }

  .date {
    font-size: 11px;
    color: #d9d9d9;
    margin-left: ${({ mine }) => (mine ? "auto" : "0")};
  }
`;
