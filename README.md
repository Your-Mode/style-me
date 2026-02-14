# Style Me

AI 기반 골격 진단으로 개인 맞춤 스타일을 제안하는 스타일링 앱입니다.

## 제품 개요

Style Me는 간단한 신청과 설문을 통해 사용자의 체형 결과를 도출하고, 바로 인쇄 가능한 PDF 리포트를 제공합니다.

## 핵심 플로우

1. Home
2. Apply
3. Complete
4. Survey
5. Result

## 기술 스택

- Next.js (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Tanstack Query + Zustand
- Firebase
- Sentry

## 시작하기

### 설치

```bash
pnpm install
```

### 개발 서버 실행

```bash
pnpm dev
```

### 빌드 / 실행

```bash
pnpm build
pnpm start
```

### 린트

```bash
pnpm lint
```

## Sentry

클라이언트/서버/엣지 에러 모니터링을 위해 Sentry를 사용합니다.

- 클라이언트 초기화: `sentry.client.config.ts`
- 서버 초기화: `sentry.server.config.ts`
- 엣지 초기화: `sentry.edge.config.ts`
- 요청 에러 캡처: `instrumentation.ts`
- 라우터 전환 추적: `instrumentation-client.ts`
