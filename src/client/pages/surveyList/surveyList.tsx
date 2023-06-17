import React from "react";
import { Link } from "react-router-dom";

import { MainLayout } from "../../layouts/mainLayout";
import * as Urls from "../../utils/urls";
import { useSurveys, Survey } from "./useSurveys";

type SurveyListProps = {
  surveys: Survey[];
};

export function SurveyList({ surveys }: SurveyListProps) {
  return (
    <ul>
      {surveys.map((survey) => {
        return (
          <li key={survey.id}>
            <Link to={Urls.surveyPage(survey.id)}>{survey.name}</Link>
          </li>
        );
      })}
    </ul>
  );
}

export function SurveyListPageContent() {
  const result = useSurveys();
  switch (result.status) {
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
      const { surveys } = result;
      return <SurveyList surveys={surveys} />;
    }
  }
}

export function SurveyListPage() {
  return (
    <MainLayout>
      <h1 className="text-3xl bold">Survey List</h1>
      <SurveyListPageContent />
    </MainLayout>
  );
}
