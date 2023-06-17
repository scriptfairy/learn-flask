import React from "react";
import { Routes, Route } from "react-router-dom";

import { MainLayout } from "./layouts/mainLayout";
import { SurveyList } from "./pages/surveyList/surveyList";
import { Survey } from "./pages/survey/survey";
import { SurveyResponse } from "./pages/surveyResponse/surveyResponse";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<SurveyList />} />
      <Route path="/survey/:surveyId" element={<Survey />} />
      <Route path="/survey/:surveyId/response" element={<SurveyResponse />} />
      <Route
        path="/survey/:surveyId/response/:responseId"
        element={<SurveyResponse />}
      />
    </Routes>
  );
}
