import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import Channel from "./Channel";
import "./css/Channel.css";

export default function Main() {
  const { currentUser } = useAuth();

  return (
    <>
      <Channel user={currentUser} db={db} />
    </>
  );
}
