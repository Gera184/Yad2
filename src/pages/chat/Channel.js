import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import Message from "./Message";
import "./css/Channel.css";
import { useAuth } from "../contexts/AuthContext";

const Channel = ({ user = null, db = null }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setMessage] = useState("");
  const { uid } = user;
  const { currentUser } = useAuth();

  useEffect(() => {
    if (db) {
      const unsubscribe = db
        .collection("messages")
        .orderBy("createdAt")
        .limit(100)
        .onSnapshot((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setMessages(data);
        });

      return unsubscribe;
    }
  }, [db]);

  const handleonChange = (e) => {
    setMessage(e.target.value);
  };

  const handleonSubmit = (e) => {
    e.preventDefault();

    if (db) {
      db.collection("messages").add({
        text: newMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        displayName: currentUser.email,
      });
    }
    setMessage("");
  };

  return (
    <>
      <div className="channel">
        {messages.map((message) => (
          <div key={message.id}>
            <Message {...message} />
          </div>
        ))}
        <div className="channel-input">
          <input
            type="text"
            value={newMessage}
            onChange={handleonChange}
            placeholder="Type here"
          />
          <button type="submit" disabled={!newMessage} onClick={handleonSubmit}>
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default Channel;
