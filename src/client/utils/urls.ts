export function homePage() {
  return "/";
}

export function surveyPage(surveyId: string) {
  return `/survey/${surveyId}`;
}

export function surveyResponsePage(
  surveyId: string,
  responseId: string | null
) {
  if (responseId) {
    return `/survey/${surveyId}/response/${responseId}`;
  }
  return `/survey/${surveyId}/response`;
}
