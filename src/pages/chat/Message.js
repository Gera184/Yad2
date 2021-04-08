import React from "react";
import { formatRelative } from "date-fns";
import { useAuth } from "../contexts/AuthContext";
import "./css/Message.css";

const Message = ({ createdAt = null, text = "", displayName = "" }) => {
  // const { currentUser } = useAuth();

  return (
    <>
      <span className="user">
        <p>{displayName}</p>
      </span>
      {createdAt?.seconds ? (
        <span>
          {formatRelative(new Date(createdAt.seconds * 1000), new Date())}
        </span>
      ) : null}
      <span className="user">
        <p>{text}</p>
      </span>
    </>
  );
};

export default Message;
