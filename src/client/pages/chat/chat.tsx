import React from "react";
import { MainLayout } from "../../layouts/mainLayout";
import { useChat, SendChatState, ChatResponse } from "./useChat";

type ChatReponseProps = {
  chatResponse: ChatResponse;
};

function ChatResponse(props: ChatReponseProps) {
  const { chatResponse } = props;
  return (
    <div>
      {chatResponse.choices.map((choice, index) => {
        return <div key={index}>{choice.message.content}</div>;
      })}
    </div>
  );
}

type ChatResultProps = {
  sendChatState: SendChatState;
};

function ChatResult(props: ChatResultProps) {
  const { sendChatState } = props;
  switch (sendChatState.status) {
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
      const { chatResponse } = sendChatState;
      return <ChatResponse chatResponse={chatResponse} />;
    }
  }
}

export function ChatPage() {
  const [text, setText] = React.useState("");

  const [sendChat, sendChatState] = useChat();

  return (
    <MainLayout>
      <h1>Chat</h1>
      <form>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Send a message to chatGPT
        </label>
        <textarea
          className="border w-full h-32"
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
      <ChatResult sendChatState={sendChatState} />
    </MainLayout>
  );
}
