const DEFAULT_PRINT_MESSAGE = "인쇄 대화상자에서 '대상'을 'PDF로 저장'으로 선택해주세요.";
const SAFARI_PRINT_MESSAGE = "인쇄 대화상자에서 'PDF' 버튼을 클릭해주세요.";

export function getBrowserPrintMessage(userAgent: string) {
  const normalizedUserAgent = userAgent.toLowerCase();
  if (normalizedUserAgent.includes('safari') && !normalizedUserAgent.includes('chrome')) {
    return SAFARI_PRINT_MESSAGE;
  }
  return DEFAULT_PRINT_MESSAGE;
}
