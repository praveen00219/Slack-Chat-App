import { Add, Home } from "@mui/icons-material";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import db from "../firebase/firebase";
import SidebarList from "./SidebarList";

function Slidebar() {
  const [siderbarSate, setSiderBarState] = useState([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    return onSnapshot(
      query(collection(db, "post"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setSiderBarState(snapshot.docs);
      }
    );
  }, []);

  return (
    <Wrapper>
      {/* Circle Icon */}
      <ExpendCircle
        onMouseEnter={() => setIsSidebarVisible(true)}
        onMouseLeave={() => setIsSidebarVisible(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="#2bb5ed"
            d="M9 6h1.5l6 6l-6 6H9zm4.67 6L11 9.33v5.34z"
            strokeWidth="0.5"
            stroke="#2bb5ed"
          />
        </svg>
      </ExpendCircle>

      {/* Sidebar */}
      <Container
        ref={sidebarRef}
        isVisible={isSidebarVisible}
        onMouseEnter={() => setIsSidebarVisible(true)}
        onMouseLeave={() => setIsSidebarVisible(false)}
      >
        <Header>
          <Heading>Coding Community</Heading>
          <Circle>
            <Adds />
          </Circle>
        </Header>
        <Link style={{ color: "rgba(119, 84, 119, 255)" }} to="/">
          <SidebarList Icon={Home} title="Home" />
        </Link>
        <Bar />
        <SidebarList Icon={Add} title="Add channel" addChannel />
        <SidebarContainer>
          {siderbarSate.map((post) => (
            <SidebarList
              key={post?.id}
              id={post?.id}
              title={post?.data().channelName}
              creator={post?.data().name}
              sideEmail={post?.data().email}
            />
          ))}
        </SidebarContainer>
      </Container>
    </Wrapper>
  );
}

export default Slidebar;

/* Styled Components */

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  z-index: 990;
`;

const Container = styled.div`
  background-color: rgba(63, 14, 64, 255);
  height: 90.8vh;
  display: flex;
  color: rgba(119, 84, 119, 255);
  flex-direction: column;
  position: absolute;
  top: 0;
  left: ${(props) =>
    props.isVisible ? "0" : "-250px"}; /* Sidebar hidden initially */
  width: 250px;
  transition: left 0.3s ease-in-out; /* Smooth transition */
  box-shadow: ${(props) =>
    props.isVisible ? "5px 0 10px rgba(0, 0, 0, 0.3)" : "none"};
`;

const ExpendCircle = styled.div`
  background-color: rgba(53, 13, 54, 255);
  height: 40px;
  cursor: pointer;
  width: 30px;
  border-radius: 0 50% 50% 0;
  display: flex;
  align-items: center;
  justify-content: end;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1); /* Slight scale effect on hover */
  }
`;

const Circle = styled.div`
  background-color: white;
  height: 40px;
  cursor: pointer;
  width: 40px;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  position: relative;
  z-index: 10;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1); /* Slight scale effect on hover */
  }
`;

const Heading = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: white;
`;

const Header = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Adds = styled(Add)`
  background-color: white;
  height: 10px;
  width: 10px;
  border-radius: 20px;
  border: 1px solid black;
`;

const Bar = styled.div`
  width: 100%;
  margin-top: 15px;
  border-bottom: 2px solid rgba(119, 84, 119, 255);
`;

const SidebarContainer = styled.div`
  height: 100%;
  overflow-y: auto;
  margin-top: 10px;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;
