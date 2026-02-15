function addClassToAll(root: HTMLElement, selector: string, className: string) {
  root.querySelectorAll(selector).forEach((el) => {
    el.classList.add(className);
  });
}

function applyGradientClasses(root: HTMLElement) {
  const gradientElements = root.querySelectorAll('.bg-gradient-to-r, .bg-gradient-to-br');
  gradientElements.forEach((el) => {
    if (el.textContent?.includes('골격진단') || el.classList.contains('from-pink-500')) {
      el.classList.add('print-gradient-pink');
      return;
    }
    el.classList.add('print-gradient-purple');
  });
}

function applyTitleClasses(root: HTMLElement) {
  const titleElements = root.querySelectorAll('h1, h2, .text-2xl');
  titleElements.forEach((el) => {
    if (el.classList.contains('text-4xl') || el.classList.contains('text-5xl')) {
      el.classList.add('print-title');
      return;
    }
    el.classList.add('print-subtitle');
  });
}

function applyIconClasses(root: HTMLElement) {
  const icons = root.querySelectorAll('svg');
  icons.forEach((icon) => {
    const parent = icon.closest('.flex');
    if (parent?.textContent?.includes('상세 체형') || parent?.textContent?.includes('골격진단')) {
      icon.classList.add('print-icon-pink');
    } else if (parent?.textContent?.includes('보완')) {
      icon.classList.add('print-icon-purple');
    } else if (parent?.textContent?.includes('추천')) {
      icon.classList.add('print-icon-green');
    } else if (parent?.textContent?.includes('피해')) {
      icon.classList.add('print-icon-red');
    } else if (parent?.textContent?.includes('스타일링')) {
      icon.classList.add('print-icon-yellow');
    } else if (parent?.textContent?.includes('매력')) {
      icon.classList.add('print-icon-rose');
    }
  });
}

export function applyPrintClasses(root: HTMLElement) {
  root.classList.add('print-content');
  applyGradientClasses(root);
  addClassToAll(root, '.bg-clip-text', 'print-gradient-text');
  addClassToAll(root, '.shadow-xl, .shadow-lg', 'print-card');
  applyTitleClasses(root);
  addClassToAll(root, 'p, .prose', 'print-text');
  applyIconClasses(root);
}

export function cleanupPrintClasses(root: HTMLElement) {
  root.classList.remove('print-content');
  root.querySelectorAll("[class*='print-']").forEach((el) => {
    try {
      if (typeof el.className === 'string') {
        el.className = el.className.replace(/print-[a-z-]+/g, '').trim();
        return;
      }
      const classesToRemove = Array.from(el.classList).filter((className) =>
        className.startsWith('print-'),
      );
      classesToRemove.forEach((className) => el.classList.remove(className));
    } catch (error) {
      console.warn('클래스 정리 중 오류:', error);
    }
  });
}
