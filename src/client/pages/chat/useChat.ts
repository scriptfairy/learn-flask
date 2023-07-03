import React from "react";
import { z } from "zod";

const choiceMessageSchema = z.object({
  content: z.string(),
});

const choiceSchema = z.object({
  message: choiceMessageSchema,
});

const chatResponseSchema = z.object({
  choices: z.array(choiceSchema),
});

export type ChatResponse = z.infer<typeof chatResponseSchema>;

type SendChat = (text: string) => void;

export type SendChatState =
  | { status: "Idle" }
  | { status: "Loading" }
  | { status: "Error"; error: Error }
  | { status: "Success"; chatResponse: ChatResponse };

export function useChat(): [SendChat, SendChatState] {
  const [state, setState] = React.useState<SendChatState>({ status: "Idle" });

  const sendChat: SendChat = (text: string): void => {
    setState({ status: "Loading" });

    fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ text }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((result) => {
        if (result.status !== 200) {
          const error = new Error(result.statusText);
          return Promise.reject(error);
        }
        return result.json();
      })
      .then((json) => {
        const chatResponse = chatResponseSchema.parse(json);
        setState({ status: "Success", chatResponse });
      })
      .catch((error) => {
        setState({ status: "Error", error });
      });
  };

  return [sendChat, state];
}
