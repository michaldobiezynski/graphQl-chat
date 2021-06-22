import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import { messagesQuery, addMessageMutation } from "./graphql/queries";

const Chat = ({ user }) => {
  const { data } = useQuery(messagesQuery);
  const [addMessgae] = useMutation(addMessageMutation);
  const messages = data ? data.messages : [];

  const handleSend = async (text) => {
    const { data } = await addMessgae({ variables: { input: { text } } });
    console.log(data);
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
