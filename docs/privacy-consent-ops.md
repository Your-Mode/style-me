# Apply 개인정보 운영 가이드

## 목적

- `/apply`에서 수집한 개인정보의 동의/보관/파기/권리행사 흐름을 운영 관점에서 일치시킨다.

## 동의 로그 스키마

- 문서: `apply/{phoneId}`
- 필드:
  - `requestId`: `"{phoneId}-{timestamp}"`
  - `consentSnapshot`:
    - `agreePrivacy`
    - `agreeService`
    - `agreePhotoProcessing`
    - `agreeMarketing`
    - `policyVersion`
    - `termsVersion`
    - `consentNoticeVersion`
    - `agreedAtISO`
    - `requestId`
- 서브컬렉션: `apply/{phoneId}/consent_logs`
  - 각 제출 시 `consentSnapshot` + `createdAt(serverTimestamp)` 기록

## 보관/파기 운영 설계

- 정책 문구: `서비스 종료 후 1년 보관 후 파기`
- 운영 방식:
  1. 기준일 계산: `createdAt` 또는 `updatedAt` 기준 1년 초과 데이터 탐색
  2. 삭제 대상 검증: 파기 대상 레코드 수, 최근 요청 여부 확인
  3. 배치 삭제: `apply/{phoneId}` 및 `consent_logs` 하위 문서 삭제
  4. 실행 로그: 실행 시각, 삭제 건수, 실패 건수 별도 로그 저장
- 권장 실행 주기: 주 1회 배치

## 권리행사 처리 경로

- 사용자 안내 문구: `하단 문의하기 폼 또는 카카오 채널`
- 처리 절차:
  1. 요청 접수
  2. 본인 확인
  3. 열람/정정/삭제 요청 처리
  4. 처리 결과 회신 및 내부 이력 기록

## QA 시나리오

1. 필수 동의 미체크
- 기대 결과: 제출 차단, 필수 동의 안내 문구 노출

2. 선택 동의 거부
- 기대 결과: 제출 가능, 저장 데이터에 선택 동의 `false` 반영

3. 정책 링크 노출
- 기대 결과: `/apply`에서 개인정보처리방침/이용약관 링크 클릭 가능

4. 동의 버전 저장
- 기대 결과: `consentSnapshot.policyVersion`, `termsVersion`, `consentNoticeVersion` 저장

5. 동의 시각 저장
- 기대 결과: `consentSnapshot.agreedAtISO` 및 `consent_logs.createdAt` 저장

6. 요청 식별자 저장
- 기대 결과: `requestId`가 `apply` 문서와 `consent_logs` 모두에 기록
