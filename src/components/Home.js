import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectName } from "../features/User/userSlice";

function Home() {
  const name = useSelector(selectName);
  const shortend = name ? name.split(" ")[0] : name;

  return (
    <Container>
      <img src="/img/header-logo.png" alt="" width="50" />
      <h2 style={{ marginLeft: "10px" }}>
        Weclome<span>{shortend}</span>
      </h2>
    </Container>
  );
}

export default Home;

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  overflow-y: auto;
  height: 72vh;
  scrollbar-width: none; /* Hides the scrollbar for Firefox */

  &::-webkit-scrollbar {
    display: none; /* Hides the scrollbar for Chrome, Safari, Edge */
  }

  justify-content: center;
  align-items: center;
  font-weight: 700;
  span {
    padding-left: 10px;
  }
`;
