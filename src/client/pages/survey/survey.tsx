import React from "react";
import { useParams, Link } from "react-router-dom";

import { SurveyLayout } from "../../layouts/surveyLayout";

type SurveyParams = {
  surveyId: string;
};

export function Survey() {
  const { surveyId } = useParams<SurveyParams>();

  return (
    <SurveyLayout surveyId={surveyId || ""}>
      <div>
        <h1>Survey {surveyId}</h1>
        <p>
          <Link to="/survey/abc123/response">Start</Link>
        </p>
      </div>
    </SurveyLayout>
  );
}
