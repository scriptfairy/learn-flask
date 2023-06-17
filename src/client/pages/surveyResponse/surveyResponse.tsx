import React from "react";
import { useParams } from "react-router-dom";

import { SurveyLayout } from "../../layouts/surveyLayout";

type SurveyResponseParams = {
  surveyId: string;
  responseId: string;
};

export function SurveyResponse() {
  const { surveyId, responseId } = useParams<SurveyResponseParams>();

  return (
    <SurveyLayout surveyId={surveyId || ""}>
      <div>
        <h1>
          Survey Response {surveyId} {responseId}
        </h1>
      </div>
    </SurveyLayout>
  );
}
