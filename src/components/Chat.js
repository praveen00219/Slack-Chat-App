import styled from "styled-components";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react"; // Import emoji picker
import {
  selectChannelId,
  selectChannelName,
} from "../features/Channel/channelSlice";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import db from "../firebase/firebase";
import {
  selectEmail,
  selectName,
  selectPhoto,
} from "../features/User/userSlice";
import Messager from "./Messager";
import { useNavigate } from "react-router-dom";

function Chat() {
  const [portfo, setPortfo] = useState([]);
  const [input, setInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // Toggle for emoji picker
  const channelName = useSelector(selectChannelName);
  const channelId = useSelector(selectChannelId);
  const [loading, setLoading] = useState(false);
  const name = useSelector(selectName);
  const shortName = name ? name.split(" ") : name;
  const photo = useSelector(selectPhoto);
  const email = useSelector(selectEmail);
  const navigate = useNavigate();
  const scrollref = useRef(null);

  // Function to handle emoji selection
  const onEmojiClick = (emojiObject) => {
    setInput((prevInput) => prevInput + emojiObject.emoji);
  };

  const Submit = async (e) => {
    e.preventDefault();
    if (input.length <= 0) return;

    if (loading) return;
    setLoading(true);

    await addDoc(collection(db, "post", channelId, "message"), {
      input: input,
      username: shortName[0],
      photo: photo,
      email: email,
      timestamp: serverTimestamp(),
    });

    setInput("");
    setLoading(false);
  };

  useEffect(() => {
    if (channelId) {
      onSnapshot(
        query(
          collection(db, "post", channelId, "message"),
          orderBy("timestamp", "asc")
        ),
        (snapshot) => setPortfo(snapshot.docs)
      );
    }
  }, [channelId]);

  useEffect(() => {
    if (!channelId) {
      navigate("/");
    }
  }, [channelId, navigate]);

  return (
    <Container>
      <Header>
        <span> # {channelName}</span>
        <InfoOutlinedIcon style={{ cursor: "pointer" }} />
      </Header>

      <Messenger>
        {portfo.map((post) => (
          <Messager
            key={post?.id}
            caption={post?.data().input}
            username={post?.data().username}
            email={post?.data().email}
            photo={post?.data().photo}
            id={post?.id}
          />
        ))}
        <SpaceBelow ref={scrollref} />
      </Messenger>

      <Const>
        <ChatContainer>
          <div style={{ position: "relative" }}>
            {/* Emoji Picker Toggle Button */}
            <EmojiButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
              😀
            </EmojiButton>

            {/* Emoji Picker */}
            {showEmojiPicker && (
              <EmojiContainer>
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </EmojiContainer>
            )}
            <InputContainer onSubmit={Submit}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                placeholder="Type a message..."
              />

              <button disabled={loading} onClick={Submit}>
                {loading ? (
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="12"
                        cy="2"
                        r="0"
                        fill="#2bb5ed"
                        stroke-width="0.5"
                        stroke="#2bb5ed"
                      >
                        <animate
                          attributeName="r"
                          begin="0"
                          calcMode="spline"
                          dur="1s"
                          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                          repeatCount="indefinite"
                          values="0;2;0;0"
                        />
                      </circle>
                      <circle
                        cx="12"
                        cy="2"
                        r="0"
                        fill="#2bb5ed"
                        transform="rotate(45 12 12)"
                        stroke-width="0.5"
                        stroke="#2bb5ed"
                      >
                        <animate
                          attributeName="r"
                          begin="0.125s"
                          calcMode="spline"
                          dur="1s"
                          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                          repeatCount="indefinite"
                          values="0;2;0;0"
                        />
                      </circle>
                      <circle
                        cx="12"
                        cy="2"
                        r="0"
                        fill="#2bb5ed"
                        transform="rotate(90 12 12)"
                        stroke-width="0.5"
                        stroke="#2bb5ed"
                      >
                        <animate
                          attributeName="r"
                          begin="0.25s"
                          calcMode="spline"
                          dur="1s"
                          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                          repeatCount="indefinite"
                          values="0;2;0;0"
                        />
                      </circle>
                      <circle
                        cx="12"
                        cy="2"
                        r="0"
                        fill="#2bb5ed"
                        transform="rotate(135 12 12)"
                        stroke-width="0.5"
                        stroke="#2bb5ed"
                      >
                        <animate
                          attributeName="r"
                          begin="0.375s"
                          calcMode="spline"
                          dur="1s"
                          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                          repeatCount="indefinite"
                          values="0;2;0;0"
                        />
                      </circle>
                      <circle
                        cx="12"
                        cy="2"
                        r="0"
                        fill="#2bb5ed"
                        transform="rotate(180 12 12)"
                        stroke-width="0.5"
                        stroke="#2bb5ed"
                      >
                        <animate
                          attributeName="r"
                          begin="0.5s"
                          calcMode="spline"
                          dur="1s"
                          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                          repeatCount="indefinite"
                          values="0;2;0;0"
                        />
                      </circle>
                      <circle
                        cx="12"
                        cy="2"
                        r="0"
                        fill="#2bb5ed"
                        transform="rotate(225 12 12)"
                        stroke-width="0.5"
                        stroke="#2bb5ed"
                      >
                        <animate
                          attributeName="r"
                          begin="0.625s"
                          calcMode="spline"
                          dur="1s"
                          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                          repeatCount="indefinite"
                          values="0;2;0;0"
                        />
                      </circle>
                      <circle
                        cx="12"
                        cy="2"
                        r="0"
                        fill="#2bb5ed"
                        transform="rotate(270 12 12)"
                        stroke-width="0.5"
                        stroke="#2bb5ed"
                      >
                        <animate
                          attributeName="r"
                          begin="0.75s"
                          calcMode="spline"
                          dur="1s"
                          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                          repeatCount="indefinite"
                          values="0;2;0;0"
                        />
                      </circle>
                      <circle
                        cx="12"
                        cy="2"
                        r="0"
                        fill="#2bb5ed"
                        transform="rotate(315 12 12)"
                        stroke-width="0.5"
                        stroke="#2bb5ed"
                      >
                        <animate
                          attributeName="r"
                          begin="0.875s"
                          calcMode="spline"
                          dur="1s"
                          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                          repeatCount="indefinite"
                          values="0;2;0;0"
                        />
                      </circle>
                    </svg>
                  </div>
                ) : (
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 20 20"
                    >
                      <g fill="none">
                        <path
                          fill="url(#fluentColorSend202)"
                          d="M11.5 9.5a.5.5 0 0 1 0 1l-8.122 1.767L3.983 10l-.605-2.268z"
                        />
                        <path
                          fill="url(#fluentColorSend200)"
                          d="M2.724 2.053a.5.5 0 0 0-.707.576l1.498 5.618a.5.5 0 0 0 .4.364l6.855 1.142c.279.047.279.447 0 .494l-6.854 1.142a.5.5 0 0 0-.401.364l-1.498 5.618a.5.5 0 0 0 .707.576l15-7.5a.5.5 0 0 0 0-.894z"
                        />
                        <path
                          fill="url(#fluentColorSend201)"
                          d="M2.724 2.053a.5.5 0 0 0-.707.576l1.498 5.618a.5.5 0 0 0 .4.364l6.855 1.142c.279.047.279.447 0 .494l-6.854 1.142a.5.5 0 0 0-.401.364l-1.498 5.618a.5.5 0 0 0 .707.576l15-7.5a.5.5 0 0 0 0-.894z"
                        />
                        <defs>
                          <linearGradient
                            id="fluentColorSend200"
                            x1="2"
                            x2="15.703"
                            y1="-4.5"
                            y2="13.708"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#3bd5ff" />
                            <stop offset="1" stop-color="#0094f0" />
                          </linearGradient>
                          <linearGradient
                            id="fluentColorSend201"
                            x1="10"
                            x2="14.161"
                            y1="6.313"
                            y2="17.571"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop
                              offset=".125"
                              stop-color="#dcf8ff"
                              stop-opacity="0"
                            />
                            <stop
                              offset=".769"
                              stop-color="#ff6ce8"
                              stop-opacity="0.7"
                            />
                          </linearGradient>
                          <radialGradient
                            id="fluentColorSend202"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientTransform="matrix(7 0 0 .9275 1.5 10)"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#0094f0" />
                            <stop offset="1" stop-color="#2052cb" />
                          </radialGradient>
                        </defs>
                      </g>
                    </svg>
                  </div>
                )}
              </button>
            </InputContainer>
          </div>
        </ChatContainer>
      </Const>
    </Container>
  );
}

export default Chat;

/* Styled Components */
const Container = styled.div`
  position: relative;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  border: 1px solid gray;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background: #202225;
  color: white;
`;

const Messenger = styled.div`
  flex-grow: 1;
  padding: 10px;
  overflow-y: auto;
  height: 72vh;
  scrollbar-width: none; /* Hides the scrollbar for Firefox */

  &::-webkit-scrollbar {
    display: none; /* Hides the scrollbar for Chrome, Safari, Edge */
  }
`;

const SpaceBelow = styled.div`
  height: 30px;
`;

const Const = styled.div`
  border-radius: 50%;
  padding: 10px 0 30px 0;
`;

const ChatContainer = styled.div`
  max-width: 600px; /* Set width for input container */
  width: 100%;
  margin: 0 auto; /* Center it horizontally */
`;

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  background: #40444b;
  padding: 10px;
  border-radius: 5px;

  input {
    flex: 1;
    padding: 10px 10px 10px 50px;
    background: transparent;
    border: none;
    font-size: 20px;
    color: white;
    outline: none;
    text-align: left; /* Keep text aligned left */
  }

  button {
    background: rgb(172, 182, 215);
    color: white;
    padding: 8px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 5px;
  }

  button:disabled {
    background: gray;
    cursor: not-allowed;
  }
`;

const EmojiButton = styled.button`
  background: transparent;
  border: none;
  border-right: 1px solid gray;
  padding: 5px;
  font-size: 24px;
  cursor: pointer;
  margin-right: 8px;
  position: absolute;
  bottom: 20%;
  left: 5px;
`;

const EmojiContainer = styled.div`
  position: absolute;
  bottom: 60px;
  left: 10px;
  z-index: 10;
`;
