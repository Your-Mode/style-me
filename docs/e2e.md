# E2E Testing (Playwright)

핵심 사용자 플로우를 E2E로 검증합니다.

- 시나리오: `Home -> Apply -> Survey -> Result`
- 테스트 파일: `e2e/core-user-flow.spec.ts`

## 실행

```bash
pnpm e2e
```

추가 옵션:

```bash
pnpm e2e:headed
pnpm e2e:ui
```

## 테스트 모드 동작

E2E 실행 시 dev 서버는 `NEXT_PUBLIC_E2E_TEST_MODE=true`로 실행됩니다.

- Firebase 함수(`applyBodyDiagnosis`, `saveSurveyAnswers`, `valueExists`)는 네트워크 의존 없이 테스트용 분기로 동작
- 일부 UI 지연시간(신청 완료/인증 완료/질문 전환)은 0ms로 단축
- `assistant/chat`, `assistant/body-result`는 Playwright에서 네트워크 응답을 mock 처리
