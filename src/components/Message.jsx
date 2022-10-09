import React from "react";
import styled from "styled-components";

function Message({ image, text, mine, date }) {
  return <Container mine={mine}>{text}</Container>;
}

export default Message;

const Container = styled.div`
  width: fit-content;
  max-width: 80%;
  padding: 10px 20px;
  margin-left: ${({ mine }) => (!mine ? "auto" : "0")};
  margin-right: ${({ mine }) => (mine ? "auto" : "0")};
  background-color: ${({ mine }) => (mine ? "#CFCFCF" : "#1966FF")};
  color: ${({ mine }) => (mine ? "black" : "white")};
  border-radius: 10px;
  font-size: 14px;
  line-height: 1.3em;
`;
