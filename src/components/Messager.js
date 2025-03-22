import React, { useEffect, useRef, useState } from "react";
import { Avatar } from "@mui/material";
import { deleteDoc, doc } from "firebase/firestore";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectChannelId } from "../features/Channel/channelSlice";
import { selectEmail } from "../features/User/userSlice";
import db from "../firebase/firebase";

function Messager({ caption, username, email, photo, id }) {
  const originalEmail = useSelector(selectEmail);
  const channelId = useSelector(selectChannelId);
  const [showDropdown, setShowDropdown] = useState(false); // Toggle dropdown
  const messagesEndRef = useRef(null); // Ref for auto-scrolling

  const deleteMessages = async () => {
    if (email === originalEmail) {
      await deleteDoc(doc(db, "post", channelId, "message", id));
    }
  };

  let user = originalEmail === email;

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [caption]);

  return (
    <MessageContainer>
      <Wrapper user={user}>
        {email === originalEmail && (
          <DropdownContainer>
            <div onClick={() => setShowDropdown(!showDropdown)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m7 10l5 5m0 0l5-5"
                />
              </svg>
            </div>

            {/* Dropdown Menu */}
            {showDropdown && (
              <DropdownMenu>
                <DropdownItem onClick={deleteMessages}>Delete</DropdownItem>
              </DropdownMenu>
            )}
          </DropdownContainer>
        )}

        <AvatarContainer user={user}>
          <Avatar src={photo ? photo : username} alt={username} />
        </AvatarContainer>

        <MessageWrapper user={user}>{caption}</MessageWrapper>

        <UserNameWrapper user={user}>
          {email === originalEmail ? "You" : username}
        </UserNameWrapper>
      </Wrapper>

      {/* Invisible div to track the last message for auto-scrolling */}
      <div ref={messagesEndRef} />
    </MessageContainer>
  );
}

export default Messager;

/* Styled Components */
const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  position: relative;
  margin-inline: 14px;
  justify-content: ${(props) => props.user && "flex-end"};
`;

const AvatarContainer = styled.div`
  height: 2rem;
  width: 2rem;
  margin-right: 10px;
  order: ${(props) => props.user && "9999999"};
  position: relative;
`;

const MessageWrapper = styled.div`
  display: flex;
  padding: 0.75rem;
  border-radius: 0.5rem;
  transition: all 150ms ease-out;
  cursor: pointer;
  :hover {
    opacity: 0.75;
  }
  border-bottom-right-radius: ${(props) => props.user && "0px"};
  font-weight: 600;
  background-color: ${(props) =>
    props.user ? "rgba(96, 165, 250,1)" : "rgba(78, 222, 222, 1)"};
`;

const UserNameWrapper = styled.p`
  position: absolute;
  font-size: 0.75rem;
  line-height: 1rem;
  bottom: -1.25rem;
  color: ${(props) =>
    props.user ? "rgba(96 , 165, 250, 1)" : "rgba(78, 222, 222, 1)"};
`;

const MessageContainer = styled.div`
  padding: 1rem;
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
