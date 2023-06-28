import React from "react";

import { MainLayout } from "../../layouts/mainLayout";
import { useChat, SendChatResult, ChatResponse } from "./useChat";

type ChatReponseProps = {
  chatResponse: ChatResponse;
};

function ChatResponse(props: ChatReponseProps) {
  const { chatResponse } = props;
  return (
    <div>
      {chatResponse.choices.map((choice) => {
        return <div>{choice.message.content}</div>;
      })}
    </div>
  );
}

type ChatResultProps = {
  chatResult: SendChatResult;
};

function ChatResult(props: ChatResultProps) {
  const { chatResult } = props;
  switch (chatResult.status) {
    case "Idle": {
      return null;
    }
    case "Loading": {
      return "Loading ...";
    }
    case "Error": {
      return "Error";
    }
    case "Success": {
      const { chatResponse } = chatResult;
      return <ChatResponse chatResponse={chatResponse} />;
    }
  }
}

export function ChatPage() {
  const [text, setText] = React.useState("");

  const [sendChat, chatResult] = useChat();

  return (
    <MainLayout>
      <h1>Chat</h1>
      <form>
        <textarea
          className="border w-full"
          value={text}
          onChange={(event) => {
            setText(event.target.value);
          }}
        />
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            sendChat(text);
          }}
        >
          Send
        </button>
      </form>
      <ChatResult chatResult={chatResult} />
    </MainLayout>
  );
}
