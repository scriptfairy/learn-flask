export function surveyListPage() {
  return "/surveys";
}

export function surveyPage(surveyId: string) {
  return `/survey/${surveyId}`;
}

export function surveyResponsePage(surveyId: string, responseId: string) {
  return `/survey/${surveyId}/response/${responseId}`;
}
