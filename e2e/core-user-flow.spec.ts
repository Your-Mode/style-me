import { expect, test } from '@playwright/test';

const TOTAL_SURVEY_QUESTIONS = 15;

test('Home -> Apply -> Survey -> Result 핵심 플로우', async ({ page }) => {
  await page.route('**/assistant/chat', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        isSuccess: true,
        selected: 'A',
        message: '테스트 응답입니다.',
        nextQuestion: '',
      }),
    });
  });

  await page.route('**/assistant/body-result', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        body_type: 'E2E_TEST_TYPE',
        type_description: '테스트용 타입 설명',
        detailed_features: '테스트 상세 특징',
        attraction_points: '테스트 매력 포인트',
        recommended_styles: '테스트 추천 스타일',
        avoid_styles: '테스트 피해야 할 스타일',
        styling_fixes: '테스트 스타일링 보정',
        styling_tips: '테스트 스타일링 팁',
      }),
    });
  });

  await page.goto('/');

  await page.locator('a[href="/apply"]').first().click();
  await expect(page).toHaveURL(/\/apply/);

  await page.fill('#name', '홍길동');
  await page.fill('#phone', '01012345678');
  await page.fill('#email', 'e2e@example.com');
  await page.click('#female', { force: true });
  await page.fill('#height', '165');
  await page.fill('#weight', '55');
  await page.click('#agreePrivacy', { force: true });
  await page.click('#agreeService', { force: true });
  await page.click('#card', { force: true });

  await page.locator('button.w-full').last().click();
  await expect(page).toHaveURL(/\/complete/);

  await page.locator('a[href="/survey"]').first().click();
  await expect(page).toHaveURL(/\/survey/);

  await page.fill('#phone', '01012345678');
  await page.keyboard.press('Enter');

  await expect(page.locator('#phone')).toHaveCount(0);
  const chatInput = page.locator('input').first();

  for (let i = 0; i < TOTAL_SURVEY_QUESTIONS; i += 1) {
    await expect(chatInput).toBeEnabled();
    await chatInput.fill('A');
    await chatInput.press('Enter');
  }

  await expect(page).toHaveURL(/\/result/);
  await expect
    .poll(
      async () => page.evaluate(() => window.localStorage.getItem('body-result-storage') ?? ''),
      { timeout: 20_000 },
    )
    .toContain('E2E_TEST_TYPE');
  await expect(page.locator('h2', { hasText: 'E2E_TEST_TYPE' })).toBeVisible({ timeout: 20_000 });
});
