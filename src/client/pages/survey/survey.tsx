import React from "react";
import { Link } from "react-router-dom";

import { SurveyLayout } from "../../layouts/surveyLayout";
import * as Urls from "../../utils/urls";

type SurveyPageProps = {
  surveyId: string;
};

export function SurveyPage(props: SurveyPageProps) {
  const { surveyId } = props;
  return (
    <SurveyLayout surveyId={surveyId}>
      <h1>Survey {surveyId}</h1>
      <p>
        <Link to={Urls.surveyResponsePage(surveyId, null)}>Start</Link>
      </p>
    </SurveyLayout>
  );
}
