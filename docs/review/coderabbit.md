# CodeRabbit Operating Guide

## Purpose

- Automate first-pass AI code review at PR stage.
- Use CodeRabbit as a quality filter, not as a replacement for human review.

## Scope

- Target PR branches: `main`, `develop`
- Auto review: enabled
- Draft or WIP PRs: excluded by title keywords

## Priority Order

Treat CodeRabbit comments in this order:

1. Potential bug or runtime exception
2. Regression risk against existing behavior
3. Missing tests or weak test points
4. Refactoring opportunities for maintainability
5. Style or formatting suggestions

## Noise Reduction Rules

The following are excluded from review:

- `pnpm-lock.yaml`, `package-lock.json`, `yarn.lock`
- `*.min.js`, `*.map`, `*.snap`
- `test-results/**`, `playwright-report/**`, `.next/**`, `coverage/**`

Source of truth: `/.coderabbit.yaml`

## PR Workflow Without CI Conflict

- CodeRabbit runs as asynchronous PR comments.
- Existing CI (`lint/build/e2e`) remains the gate for pass/fail.
- Decision rule:
  - If CI fails: fix CI first.
  - If CI passes and CodeRabbit reports high-severity issues: fix or document rationale.
  - Low-severity or style-only comments: handle based on team convention and change cost.

## Comment Handling Standard

Each CodeRabbit comment must be handled as one of:

1. Accept

- Apply change and mark as resolved in PR discussion.

2. Defer

- Leave reason and a follow-up issue link.
- Typical reasons: out of scope for current PR, low impact, planned refactor.

3. Ignore

- Leave explicit rationale for false positive or missing context.
- Typical reasons: intended domain behavior, library constraint, already guarded elsewhere.

## Sample PR Verification

Run this once after installation:

1. Create a sample PR into `develop`.
2. Confirm CodeRabbit posts automatic review comments.
3. Process at least one comment with Accept, Defer, or Ignore.
4. Confirm handling rationale is visible in PR conversation.

## GitHub App Setup Steps

1. Install `CodeRabbit` GitHub App from GitHub Marketplace.
2. Select the owner (org or personal account).
3. Grant repository access to `style-me` (recommended: selected repositories).
4. Ensure `/.coderabbit.yaml` exists on default branch.
5. Create a test PR and confirm auto comments are posted.

## Practical Commands

- Request re-review: `@coderabbitai review`
- Request summary: `@coderabbitai summary`
- If noise repeats: adjust `path_filters` and `path_instructions` in `/.coderabbit.yaml`
