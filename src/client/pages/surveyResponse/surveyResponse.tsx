import React from "react";

import { SurveyLayout } from "../../layouts/surveyLayout";

type SurveyResponsePageProps = {
  surveyId: string;
  responseId: string | null;
};

export function SurveyResponsePage(props: SurveyResponsePageProps) {
  const { surveyId, responseId } = props;
  return (
    <SurveyLayout surveyId={surveyId || ""}>
      <h1>
        Survey Response {surveyId} {responseId}
      </h1>
    </SurveyLayout>
  );
}
