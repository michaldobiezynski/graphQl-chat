import React, { useState } from "react";
import { useQuery, useMutation, useSubscription } from "@apollo/react-hooks";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import {
  messagesQuery,
  addMessageMutation,
  messageAddedSubscription,
} from "./graphql/queries";

const Chat = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const { data } = useQuery(messagesQuery, {
    onCompleted: ({ messages }) => setMessages(messages),
  });
  useSubscription(messageAddedSubscription, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log("{subscriptionData}", subscriptionData.data.messageAdded);
      setMessages(messages.concat(subscriptionData.data.messageAdded));
    },
  });
  const [addMessgae] = useMutation(addMessageMutation);
  // const messages = data ? [data.messages] : [];

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
