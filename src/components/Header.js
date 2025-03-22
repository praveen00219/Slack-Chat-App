import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { selectName, selectPhoto, setLogOut } from "../features/User/userSlice";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useDispatch } from "react-redux";

function Header() {
  const name = useSelector(selectName);
  const dispatch = useDispatch();
  const shortName = name ? name.split(" ") : name;
  const photo = useSelector(selectPhoto);
  const [showDropdown, setShowDropdown] = useState(false);

  const SignOut = async () => {
    await signOut(auth);
    dispatch(setLogOut()); // Dispatch the action properly
  };

  return (
    <Wrapper>
      <Container>
        <Nav>
          <Left>
            <Link
              to="/"
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <img src="/img/header-logo.png" alt="" />{" "}
              <h2 style={{ color: "white" }}>Slack</h2>
            </Link>
          </Left>
          <Right>
            <Avatars
              src={photo}
              onClick={() => setShowDropdown(!showDropdown)}
            />
            <span onClick={() => setShowDropdown(!showDropdown)}>
              {shortName[0]}
            </span>

            {
              <DropdownContainer>
                <div
                  style={{ color: "white", marginTop: "5px" }}
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m7 10l5 5m0 0l5-5"
                    />
                  </svg>
                </div>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <DropdownMenu>
                    <DropdownItem onClick={SignOut}>SignOut</DropdownItem>
                  </DropdownMenu>
                )}
              </DropdownContainer>
            }
          </Right>
        </Nav>
      </Container>
    </Wrapper>
  );
}

export default Header;

const Wrapper = styled.div`
  background-color: rgba(53, 13, 54, 255);
  padding: 10px 0;
`;

const Container = styled.div`
  max-width: 1124px;
  margin: 0 auto;
  background-color: "black";
  flex-grow: 1;
`;

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Left = styled.div`
  width: 2.2rem;
  animation: Rotate 1s linear infinite;
  margin: 0 5px;
  @media (min-width: 765px) {
    margin: 0 15px;
  }

  img {
    width: 100%;
    object-fit: contain;
    animation: rotate 2s linear infinite;
  }

  @media (min-width: 765px) {
    margin: 0;
  }
  cursor: pointer;

  a {
    font-weight: 700;
  }
`;

const Avatars = styled(Avatar)`
  transition: opacity 150ms ease-out;
  cursor: pointer;
  :hover {
    opacity: 0.75;
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  span {
    font-weight: 700;
    color: #fcfafc;
    border-radius: 20px;
    cursor: pointer;
    font-size: 15px;
    margin: 5px;
    @media (min-width: 765px) {
      margin-left: 10;
    }
    transition: opacity 150ms ease-out;
    @media (min-width: 1024px) {
      margin-left: 10px;
    }

    :hover {
      opacity: 0.75;
    }
  }
`;

/* Dropdown Container */
const DropdownContainer = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

/* Dropdown Menu */
const DropdownMenu = styled.div`
  position: absolute;
  top: 30px;
  right: 0;
  background: white;
  border-radius: 5px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  padding: 5px 10px;
  z-index: 1000;
`;

/* Dropdown Item */
const DropdownItem = styled.div`
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background-color: rgba(96, 165, 250, 0.2);
  }
`;
