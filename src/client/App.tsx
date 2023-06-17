import React from "react";
import { Routes, Route, useParams, useRouteError } from "react-router-dom";

import { NotFoundPage } from "./pages/notFound/notFound";
import { SurveyListPage } from "./pages/surveyList/surveyList";
import { SurveyPage } from "./pages/survey/survey";
import { SurveyResponsePage } from "./pages/surveyResponse/surveyResponse";

export function NotFoundPageRoute() {
  return <NotFoundPage />;
}

export function SurveyListPageRoute() {
  return <SurveyListPage />;
}

export function SurveyPageRoute() {
  const { surveyId } = useParams();
  if (!surveyId) {
    throw new Error("Missing param surveyId");
  }
  return <SurveyPage surveyId={surveyId} />;
}

export function SurveyResponsePageRoute() {
  const { surveyId, responseId } = useParams();
  if (!surveyId) {
    throw new Error("Missing param surveyId");
  }
  if (!responseId) {
    throw new Error("Missing param responseId");
  }
  return (
    <SurveyResponsePage surveyId={surveyId} responseId={responseId || null} />
  );
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<SurveyListPageRoute />} />
      <Route path="/survey/:surveyId" element={<SurveyPageRoute />} />
      <Route
        path="/survey/:surveyId/response/:responseId?"
        element={<SurveyResponsePageRoute />}
      />
      <Route path="*" element={<NotFoundPageRoute />} />
    </Routes>
  );
}
