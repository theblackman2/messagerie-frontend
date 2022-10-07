import React from "react";
import styled from "styled-components";

function Loader() {
  return <Container>Loader</Container>;
}

export default Loader;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
