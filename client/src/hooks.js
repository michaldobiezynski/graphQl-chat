import React, { useState } from "react";
import { useQuery, useMutation, useSubscription } from "@apollo/react-hooks";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import {
  messagesQuery,
  addMessageMutation,
  messageAddedSubscription,
} from "./graphql/queries";

export function useChatMessages() {
  const { data } = useQuery(messagesQuery);

  const messages = data ? data.messages : [];
  useSubscription(messageAddedSubscription, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      console.log("{subscriptionData}", subscriptionData.data.messageAdded);
      // setMessages(messages.concat(subscriptionData.data.messageAdded));
      client.writeData({
        data: {
          messages: messages.concat(subscriptionData.data.messageAdded),
        },
      });
    },
  });
  const [addMessage] = useMutation(addMessageMutation);

  return {
    messages,
    addMessage: (text) => addMessage({ variables: { input: { text } } }),
  };
}
