import React from "react";
import styled from "styled-components";

function Message({ image, text, mine, date }) {
  return (
    <Container mine={mine}>
      <div className="text">{text}</div>
      <span className="dir"></span>
    </Container>
  );
}

export default Message;

const Container = styled.div`
  position: relative;
  .text {
    width: fit-content;
    max-width: 80%;
    padding: 10px 20px;
    margin-left: ${({ mine }) => (!mine ? "auto" : "20px")};
    margin-right: ${({ mine }) => (mine ? "auto" : "20px")};
    background-color: ${({ mine }) => (mine ? "#CFCFCF" : "#1966FF")};
    color: ${({ mine }) => (mine ? "black" : "white")};
    border-radius: 10px;
    font-size: 14px;
    line-height: 1.3em;
  }

  .dir {
    display: block;
    position: absolute;
    width: 20px;
    height: 15px;
    background-color: ${({ mine }) => (!mine ? "#1966FF" : "#CFCFCF")};
    right: ${({ mine }) => (!mine ? "8px" : "")};
    left: ${({ mine }) => (mine ? "8px" : "")};
    border-top-left-radius: ${({ mine }) => (mine ? "25px" : "0")};
    border-top-right-radius: ${({ mine }) => (!mine ? "25px" : "0")};
    bottom: 0;
  }
`;
