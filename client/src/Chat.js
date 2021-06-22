import React from "react";
import { useQuery } from "@apollo/react-hooks";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import { messagesQuery } from "./graphql/queries";

const Chat = ({ user }) => {
  const { data } = useQuery(messagesQuery);

  const messages = data ? data.messages : [];

  const handleSend = (text) => {
    // TODO
  };
  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Chatting as {user}</h1>
        <MessageList user={user} messages={messages} />
        <MessageInput onSend={handleSend} />
      </div>
    </section>
  );
};

export default Chat;
