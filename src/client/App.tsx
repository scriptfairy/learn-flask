import React from "react";
import { Routes, Route, useParams } from "react-router-dom";

import { SurveyListPage } from "./pages/surveyList/surveyList";
import { SurveyPage } from "./pages/survey/survey";
import { SurveyResponsePage } from "./pages/surveyResponse/surveyResponse";

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
    </Routes>
  );
}
