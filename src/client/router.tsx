import React from "react";
import { useParams, createBrowserRouter } from "react-router-dom";

import { NotFoundPage } from "./pages/notFound/notFound";
import { ChatPage } from "./pages/chat/chat";
import { SurveyListPage } from "./pages/surveyList/surveyList";
import { SurveyPage } from "./pages/survey/survey";
import { SurveyResponsePage } from "./pages/surveyResponse/surveyResponse";

function NotFoundPageRoute() {
  return <NotFoundPage />;
}

function ChatPageRoute() {
  return <ChatPage />;
}

function SurveyListPageRoute() {
  return <SurveyListPage />;
}

function SurveyPageRoute() {
  const { surveyId } = useParams();
  if (!surveyId) {
    throw new Error("Missing param surveyId");
  }
  return <SurveyPage surveyId={surveyId} />;
}

function SurveyResponsePageRoute() {
  const { surveyId, responseId } = useParams();
  if (!surveyId) {
    throw new Error("Missing param surveyId");
  }
  return (
    <SurveyResponsePage surveyId={surveyId} responseId={responseId || null} />
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SurveyListPageRoute />,
  },
  {
    path: "/chat",
    element: <ChatPageRoute />,
  },
  {
    path: "/survey/:surveyId",
    element: <SurveyPageRoute />,
  },
  {
    path: "/survey/:surveyId/response/:responseId?",
    element: <SurveyResponsePageRoute />,
  },
  {
    path: "*",
    element: <NotFoundPageRoute />,
  },
]);
