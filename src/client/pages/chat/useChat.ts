import { useState, useEffect } from "react";
import { useQuery } from "react-query";
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

type SendChatVariables = {
  text: string;
};

async function sendChat(variables: SendChatVariables): Promise<ChatResponse> {
  console.log({ variables });

  const res = await fetch("/api/chat", {
    method: "POST",
    body: JSON.stringify(variables),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  const chatResponse = chatResponseSchema.parse(data);
  return chatResponse;
}

export type SendChatResult =
  | { status: "Idle" }
  | { status: "Error" }
  | { status: "Loading" }
  | { status: "Success"; chatResponse: ChatResponse };

type SendChatFunction = (text: string) => void;

function makeSendChatResult(
  status: "error" | "idle" | "loading" | "success",
  data: ChatResponse | undefined
): SendChatResult {
  switch (status) {
    case "idle": {
      return { status: "Idle" };
    }
    case "loading": {
      return { status: "Loading" };
    }
    case "error": {
      return { status: "Error" };
    }
    case "success": {
      if (data) {
        return { status: "Success", chatResponse: data };
      }
      return { status: "Error" };
    }
  }
}

export function useChat(): [SendChatFunction, SendChatResult] {
  const [variables, setVariables] = useState<SendChatVariables | null>(null);

  const { refetch, data, status } = useQuery(
    ["sendChat", variables],
    async () => {
      if (variables) {
        return sendChat(variables);
      }
    },
    {
      enabled: false,
    }
  );

  useEffect(() => {
    if (variables) {
      refetch();
    }
  }, [variables]);

  function sendChatFunction(text: string) {
    setVariables({ text });
  }

  const result = makeSendChatResult(status, data);

  return [sendChatFunction, result];
}
