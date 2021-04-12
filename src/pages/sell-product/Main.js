import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import Channel from "./Channel";

export default function Main() {
  const { currentUser } = useAuth();

  return (
    <div>
      <Channel user={currentUser} db={db} />
    </div>
  );
}
