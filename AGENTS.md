# AGENTS.md

## Project Overview

- App: "Style Me" (Next.js App Router)
- Core flow: Home -> Apply -> Complete -> Survey -> Result
- State: React Query + Zustand (persist)
- Backend: Axios calls to `/assistant/*` endpoints
- Data: Firebase Firestore + Analytics

## Repo Structure

- app/: Next.js pages (App Router)
  - page.tsx: landing
  - apply/page.tsx: application form
  - complete/page.tsx: post-apply confirmation
  - survey/page.tsx: chat-based survey
  - result/page.tsx: body-type result + PDF print
- components/: UI + shared behavior (AuthGuard, AnalyticsListener)
  - common/: reusable layout + UI patterns
    - <name>/<name>.tsx: colocated component (prepare for stories)
- apis/: ky instance + chat/result APIs
- hooks/: React Query + Zustand stores
- lib/: providers + survey data + utils
- firebase.ts: Firebase init + Firestore helpers

## How to Run

- Install deps: `pnpm install`
- Dev: `pnpm dev`
- Build: `pnpm build`
- Start: `pnpm start`
- Lint: `pnpm lint`

## Environment Variables

- NEXT_PUBLIC_API_URL
- NEXT_PUBLIC_FIREBASE_API_KEY
- NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
- NEXT_PUBLIC_FIREBASE_PROJECT_ID
- NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
- NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
- NEXT_PUBLIC_FIREBASE_APP_ID
- NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID

## Code Quality Principles

좋은 프론트엔드 코드는 **변경하기 쉬운 코드**다.  
새 요구사항을 구현할 때 기존 코드를 빠르게 이해하고, 안전하게 수정하고, 예측 가능한 범위로 배포할 수 있어야 한다.

### 1) 가독성 (Readability)

코드는 한 번에 고려해야 할 맥락이 적고, 위에서 아래로 자연스럽게 읽혀야 한다.

- 맥락 줄이기
- 같이 실행되지 않는 코드 분리하기
- 구현 상세 추상화하기
- 로직 종류에 따라 합쳐진 함수 쪼개기
- 복잡한 조건에 이름 붙이기
- 매직 넘버에 이름 붙이기
- 시점 이동 줄이기
- 삼항 연산자 단순하게 하기

### 2) 예측 가능성 (Predictability)

함수/컴포넌트 이름, 파라미터, 반환값만 보고도 동작을 예측할 수 있어야 한다.

- 이름 겹치지 않게 관리하기
- 같은 종류의 함수는 반환 타입 통일하기
- 숨은 로직 드러내기 (명시적인 입력/출력으로 표현)

### 3) 응집도 (Cohesion)

함께 수정되어야 하는 코드는 구조적으로 함께 관리되어야 한다.

- 함께 수정되는 파일을 같은 디렉토리에 두기
- 매직 넘버 없애기
- 폼의 응집도 고려하기 (필드/검증/에러처리의 수정 지점 정렬)

### 4) 결합도 (Coupling)

수정 영향 범위가 좁고, 변경 파급을 예측 가능하게 유지해야 한다.

- 책임을 하나씩 관리하기
- 중복 코드 허용하기 (과도한 공통화로 결합도 상승시키지 않기)
- Props Drilling 줄이기 (필요 시 컴포지션/상태 경계 재설계)

## Trade-off Rules

- 가독성과 응집도는 상충할 수 있다.
- 함께 수정되지 않으면 오류 위험이 큰 경우: **응집도 우선** (공통화/추상화).
- 위험이 낮고 이해 비용이 큰 경우: **가독성 우선** (중복 허용).
- 결합도를 낮추기 위한 중복은 허용하되, 동기화 리스크가 커지면 응집도를 높이는 방향으로 재구성한다.

## Development Rules (Project-specific)

- Prefer App Router conventions (server/client components split)
- Keep UI in `components/ui` for shared atoms
- Place reusable patterns in `components/common/<name>/<name>.tsx`
- Keep network calls in `apis/` and hook wrappers in `hooks/`
- Use Zustand stores only for cross-page state; otherwise prefer local state
- Avoid hardcoding API URLs; use `NEXT_PUBLIC_API_URL`
- Keep Firestore access in `firebase.ts`

## PR / Review Checklist

- 가독성: 함수가 위에서 아래로 자연스럽게 읽히는가?
- 예측 가능성: 이름/시그니처만으로 동작을 짐작할 수 있는가?
- 응집도: 함께 바뀌는 코드가 물리적으로도 함께 있는가?
- 결합도: 수정 영향 범위를 한정했는가?

## Detailed Guide

### Readability: 맥락 줄이기

#### 같이 실행되지 않는 코드 분리하기

- 동시에 실행되지 않는 분기 로직을 한 컴포넌트/함수에 섞어두지 않는다.
- 최상위 분기에서 역할을 나눈 뒤, 하위 컴포넌트는 단일 시나리오만 담당하게 만든다.
- 목표: "한 번에 읽는 맥락 수"를 줄인다.

```tsx
function SubmitButton() {
  const isViewer = useRole() === 'viewer';
  return isViewer ? <ViewerSubmitButton /> : <MemberSubmitButton />;
}

function ViewerSubmitButton() {
  return <TextButton disabled>Submit</TextButton>;
}

function MemberSubmitButton() {
  useEffect(() => {
    showButtonAnimation();
  }, []);

  return <Button type='submit'>Submit</Button>;
}
```

#### 구현 상세 추상화하기

- 페이지 컴포넌트는 "페이지 목적" 중심으로 읽혀야 한다.
- 인증 체크, 리다이렉트, 권한 검사처럼 반복되는 상세 로직은 Wrapper/HOC/Custom Hook으로 분리한다.
- 분리 기준: 도메인 목적과 직접 관련 없는 제어 로직은 페이지 바깥으로 이동한다.

```tsx
function App() {
  return (
    <AuthGuard>
      <LoginStartPage />
    </AuthGuard>
  );
}

function LoginStartPage() {
  return <>{/* 로그인 UI */}</>;
}
```

#### 로직 종류에 따라 합쳐진 함수 쪼개기

- "페이지 전체 상태를 전부 다루는 Hook"을 만들지 않는다.
- 쿼리 파라미터, API 상태, 폼 상태를 한 덩어리로 묶기보다 기능 단위로 분리한다.
- 목표: 책임 경계를 좁혀 가독성, 성능, 변경 영향 범위를 함께 개선한다.

```tsx
export function useCardIdQueryParam() {
  const [cardId, setCardIdRaw] = useQueryParam('cardId', NumberParam);
  const setCardId = useCallback(
    (next: number) => {
      setCardIdRaw(next, 'replaceIn');
    },
    [setCardIdRaw],
  );
  return [cardId ?? undefined, setCardId] as const;
}
```

#### Readability 체크 질문

- 지금 함수/컴포넌트가 동시에 2개 이상의 시나리오를 처리하고 있나?
- 도메인 목적과 무관한 제어 로직(redirect/auth/overlay)이 본문 흐름을 깨고 있나?
- 이름만 보고 역할을 알 수 없는 지역 상태/조건/상수가 많은가?
- 분기와 핸들러가 너무 멀리 떨어져 있어 스크롤 왕복이 발생하나?

### Readability: 이름 붙이기

#### 복잡한 조건에 이름 붙이기

- 중첩 `filter/some/map` + 복합 조건(`&&`, `||`)이 섞이면 의미 변수로 분리한다.
- 기준: 읽는 사람이 조건의 "의도"를 바로 알 수 있어야 한다.
- 재사용/테스트 가능성이 있으면 별도 함수로 분리한다.

```tsx
const matchedProducts = products.filter((product) => {
  return product.categories.some((category) => {
    const isSameCategory = category.id === targetCategory.id;
    const isPriceInRange = product.prices.some((price) => price >= minPrice && price <= maxPrice);

    return isSameCategory && isPriceInRange;
  });
});
```

#### 매직 넘버에 이름 붙이기

- 의미 없는 숫자 리터럴을 직접 쓰지 않는다.
- 시간/개수/임계값/상태코드는 반드시 이름 있는 상수로 선언한다.
- 상수명은 단위 포함(`_MS`, `_SECONDS`, `_COUNT`)을 기본으로 한다.

```tsx
const ANIMATION_DELAY_MS = 300;

async function onLikeClick() {
  await postLike(url);
  await delay(ANIMATION_DELAY_MS);
  await refetchPostLike();
}
```

#### 네이밍 체크 기준

- 조건식이 2개 이상 결합되어 있으면 의미 변수로 분리했는가?
- 상수명만 보고 값의 목적/단위를 이해할 수 있는가?
- "한 번만 쓰이지만 복잡한 로직"을 이름으로 드러냈는가?
- 간단하고 자명한 로직까지 과도하게 분리해 오히려 읽기 흐름을 깨지 않았는가?

### Readability: 위에서 아래로 읽히게 하기

#### 시점 이동 줄이기

- 동작을 이해하기 위해 파일/함수/상수를 여러 번 왕복하지 않게 작성한다.
- 단순한 권한/분기 규칙은 사용 지점 근처에 둔다.
- 추상화는 복잡도를 실제로 줄일 때만 사용한다.

```tsx
function Page() {
  const user = useUser();
  const policy = {
    admin: { canInvite: true, canView: true },
    viewer: { canInvite: false, canView: true },
  }[user.role];

  return (
    <div>
      <Button disabled={!policy.canInvite}>Invite</Button>
      <Button disabled={!policy.canView}>View</Button>
    </div>
  );
}
```

#### 삼항 연산자 단순하게 하기

- 중첩 삼항 연산자는 금지한다.
- 조건 분기가 2단계 이상이면 `if` 또는 early return으로 펼친다.
- JSX 내부 삼항은 단일 조건 전환(2-way)까지만 허용한다.

```tsx
const status = (() => {
  if (isA && isB) return 'BOTH';
  if (isA) return 'A';
  if (isB) return 'B';
  return 'NONE';
})();
```

#### 왼쪽에서 오른쪽으로 읽히게 하기

- 범위 조건은 시작값에서 끝값으로 읽히게 작성한다.
- 권장: `min <= value && value <= max`
- 비권장: `value >= min && value <= max` (동일 값 반복으로 가독성 저하)

```tsx
if (minPrice <= price && price <= maxPrice) {
  console.log('적정 가격');
}

if (80 <= score && score <= 100) {
  console.log('우수');
}
```

#### 흐름 체크 기준

- 버튼/뷰의 비활성 조건을 파악하려고 여러 정의를 왕복해야 하나?
- 삼항 연산자를 한 번에 해석하기 어렵나?
- 범위 조건이 수학식처럼 한 방향으로 읽히나?
- 위에서 아래로 읽었을 때 요구사항이 그대로 보이나?

### Predictability: 일관된 인터페이스

#### 이름 겹치지 않게 관리하기

- 같은 이름이면 같은 수준의 책임/동작을 가져야 한다.
- 라이브러리 래퍼는 원본과 다른 이름을 사용해 추가 동작을 명시한다.
- 인증, 로깅, 리트라이 등 부가 동작은 함수명으로 드러낸다.

```tsx
import { http as httpLibrary } from '@some-library/http';

export const httpService = {
  async getWithAuth(url: string) {
    const token = await fetchToken();
    return httpLibrary.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
```

#### 같은 종류의 함수는 반환 타입 통일하기

- 같은 계층/종류의 Hook은 같은 shape를 반환한다.
- React Query Hook은 팀 규칙으로 Query 객체를 그대로 반환한다.
- 검증 함수는 `boolean` 또는 `ValidationResult` 중 하나로 통일하고 혼용하지 않는다.

```tsx
type ValidationResult = { ok: true } | { ok: false; reason: string };

function checkIsNameValid(name: string): ValidationResult {
  if (name.length === 0) return { ok: false, reason: '이름은 빈 값일 수 없어요.' };
  if (name.length >= 20) return { ok: false, reason: '이름은 20자 미만이어야 해요.' };
  return { ok: true };
}
```

#### 숨은 로직 드러내기

- 함수 이름/파라미터/반환 타입에서 예측되지 않는 부수효과를 넣지 않는다.
- 로깅, 트래킹, 토스트, 네비게이션은 호출 지점 또는 명시적 래퍼로 분리한다.
- 필요 시 `fetchBalanceWithLogging`처럼 부수효과를 이름으로 노출한다.

```tsx
async function fetchBalance(): Promise<number> {
  return http.get<number>('...');
}

async function onClickRefreshBalance() {
  const balance = await fetchBalance();
  logging.log('balance_fetched');
  await syncBalance(balance);
}
```

#### Predictability 체크 기준

- 이름만 봐도 부가 동작(auth/logging/cache mutation)을 예상할 수 있는가?
- 같은 역할의 Hook/함수들이 동일한 반환 타입 규칙을 따르는가?
- 호출부가 반환값 사용법을 매번 문서/구현 확인 없이 알 수 있는가?
- 함수 내부 부수효과가 실패해도 핵심 로직 실패로 전이되지 않게 분리됐는가?

### Cohesion: 함께 바뀌는 코드는 함께 둔다

#### 함께 수정되는 파일을 같은 디렉토리에 두기

- 타입별(`components`, `hooks`, `utils`) 대분류만으로 끝내지 말고 기능/도메인 단위로 묶는다.
- 특정 기능 삭제 시 관련 파일을 디렉토리 단위로 함께 삭제할 수 있어야 한다.
- 도메인 간 직접 import는 원칙적으로 금지하고, 필요하면 상위 경계에서 조합한다.

```text
src/
  components/           # 전역 공용
  hooks/                # 전역 공용
  domains/
    survey/
      components/
      hooks/
      utils/
    result/
      components/
      hooks/
      utils/
```

#### 매직 넘버 없애기 (응집도 관점)

- 숫자 값과 그 값을 요구하는 맥락(애니메이션, 타임아웃, 임계값)을 분리하지 않는다.
- 변경 시 함께 바뀌어야 하는 값은 의미 상수로 끌어올려 같은 모듈에 둔다.
- 상수는 사용처 근처 또는 도메인 상수 파일에 배치해 동시 수정을 유도한다.

```tsx
const ANIMATION_DELAY_MS = 300;

async function onLikeClick() {
  await postLike(url);
  await delay(ANIMATION_DELAY_MS);
  await refetchPostLike();
}
```

#### 폼의 응집도 생각하기

- 폼 설계 전에 "변경 단위"가 필드 중심인지 폼 전체인지 먼저 정한다.
- 필드 단위 응집은 각 필드의 독립 검증/비동기 검증/재사용 요구가 클 때 선택한다.
- 폼 전체 응집은 필드 간 의존성, 단계형 흐름(wizard), 단일 비즈니스 기능 완결성이 클 때 선택한다.
- 한 폼 안에서 두 방식을 혼합할 때는 기준을 문서화한다.

```tsx
// Form-level cohesion example
const schema = z.object({
  name: z.string().min(1, '이름을 입력해주세요.'),
  email: z.string().min(1, '이메일을 입력해주세요.').email('유효한 이메일 주소를 입력해주세요.'),
});
```

#### Cohesion 체크 기준

- 이 변경에서 같이 바뀐 파일들이 물리적으로 가까운 위치에 있는가?
- 기능 제거 시 폴더 단위 삭제만으로 잔여 코드 없이 정리 가능한가?
- 상수 변경 시 관련 동작(애니메이션/검증/요청 지연)이 함께 검토되도록 구조화됐는가?
- 폼 변경 단위(필드 vs 폼 전체)가 현재 구조와 일치하는가?

### Coupling: 변경 영향 범위를 줄인다

#### 책임을 하나씩 관리하기

- "페이지의 모든 상태를 한 Hook에서 관리"하는 구조를 피한다.
- 쿼리 파라미터/폼 상태/API 상태를 기능 단위 Hook으로 분리한다.
- 책임이 작은 Hook은 변경 영향이 좁고 회귀 범위도 예측 가능하다.

```tsx
export function useCardIdQueryParam() {
  const [cardId, setCardIdRaw] = useQueryParam('cardId', NumberParam);
  const setCardId = useCallback(
    (next: number) => {
      setCardIdRaw(next, 'replaceIn');
    },
    [setCardIdRaw],
  );
  return [cardId ?? undefined, setCardId] as const;
}
```

#### 중복 코드 허용하기

- 공통화는 "현재 비슷함"이 아니라 "앞으로도 동일하게 변함"이 확인될 때만 한다.
- 페이지별 정책/로깅/UX 차이가 예상되면 중복을 허용해 결합을 끊는다.
- 공통 모듈 수정 시 영향 대상이 빠르게 열거되지 않으면 공통화가 과한 신호다.

```tsx
// 공통화 전 체크:
// 1) 동작이 페이지마다 동일한가?
// 2) 로깅/문구/후속 동작(closeView 등)이 동일한가?
// 3) 3개월 뒤에도 동일할 가능성이 높은가?
```

#### Props Drilling 지우기

- 데이터 전달만 하는 중간 컴포넌트가 늘어나면 결합도가 높아진다.
- 1차 선택은 Composition(`children`)으로 전달 깊이를 줄이는 것.
- 2차 선택은 Context로 승격하되, "역할을 드러내는 props"까지 무조건 숨기지 않는다.

```tsx
function ItemEditModal({ open, items, recommendedItems, onConfirm, onClose }) {
  const [keyword, setKeyword] = useState('');

  return (
    <Modal open={open} onClose={onClose}>
      <ItemEditBody keyword={keyword} onKeywordChange={setKeyword} onClose={onClose}>
        <ItemEditList
          keyword={keyword}
          items={items}
          recommendedItems={recommendedItems}
          onConfirm={onConfirm}
        />
      </ItemEditBody>
    </Modal>
  );
}
```

#### Coupling 체크 기준

- 이 수정이 다른 페이지/도메인까지 연쇄 변경을 강요하는가?
- 공통 Hook/컴포넌트 수정 후 확인해야 할 호출부가 과도하게 많은가?
- 중간 전달용 props가 많아져 값 이름 변경 시 수정 범위가 넓어지는가?
- Composition으로 해결 가능한 문제를 Context로 과하게 확장하지 않았는가?

## Contribution Guide

- Before editing, locate the owning page or hook
- Keep styles consistent with existing Tailwind patterns
- If you add new pages, update navigation links as needed
- If you change survey flow, update `lib/survey-data.ts`
- If you touch auth flow, check `components/auth-guard.tsx` and localStorage keys

## Notes / Known Issues

- UI text mentions 17 questions, but `lib/survey-data.ts` currently has 15
- Auth token key mismatch: `AuthGuard` sets `authToken`, `SurveyPage` reads `aFfuthToken`
- Photo upload is local preview only (no upload/storage)
