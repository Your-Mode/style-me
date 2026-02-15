const PRINT_STYLE_CONTENT = `
  @media print {
    * {
      -webkit-print-color-adjust: exact !important;
      color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    @page {
      margin: 1cm;
      size: A4;
    }

    body {
      margin: 0;
      padding: 0;
      background: white !important;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    body * {
      visibility: hidden;
    }

    .print-content, .print-content * {
      visibility: visible;
    }

    .print-content {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      background: white !important;
    }

    [data-hide-in-pdf] {
      display: none !important;
    }

    .print-gradient-pink {
      background: #ec4899 !important;
      color: white !important;
    }

    .print-gradient-purple {
      background: #8b5cf6 !important;
      color: white !important;
    }

    .print-gradient-text {
      background: none !important;
      color: #ec4899 !important;
      -webkit-background-clip: unset !important;
      background-clip: unset !important;
    }

    .print-card {
      border: 2px solid #e5e7eb !important;
      border-radius: 12px !important;
      margin-bottom: 20px !important;
      background: white !important;
      box-shadow: none !important;
      page-break-inside: avoid;
    }

    .print-card-header {
      background: #f9fafb !important;
      border-bottom: 1px solid #e5e7eb !important;
      padding: 16px !important;
      border-radius: 10px 10px 0 0 !important;
    }

    .print-card-content {
      padding: 20px !important;
    }

    .print-title {
      color: #1f2937 !important;
      font-size: 24px !important;
      font-weight: bold !important;
      margin-bottom: 16px !important;
    }

    .print-subtitle {
      color: #374151 !important;
      font-size: 18px !important;
      font-weight: 600 !important;
      margin-bottom: 12px !important;
    }

    .print-text {
      color: #4b5563 !important;
      font-size: 14px !important;
      line-height: 1.6 !important;
      margin-bottom: 12px !important;
    }

    .print-icon-pink { color: #ec4899 !important; }
    .print-icon-purple { color: #8b5cf6 !important; }
    .print-icon-green { color: #10b981 !important; }
    .print-icon-red { color: #ef4444 !important; }
    .print-icon-yellow { color: #f59e0b !important; }
    .print-icon-rose { color: #f43f5e !important; }

    .print-header {
      text-align: center;
      margin-bottom: 30px !important;
      page-break-after: avoid;
    }

    .print-header-circle {
      width: 80px !important;
      height: 80px !important;
      background: #ec4899 !important;
      border-radius: 50% !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      margin-bottom: 20px !important;
      font-size: 32px !important;
    }

    .page-break-before {
      page-break-before: always;
    }

    .page-break-avoid {
      page-break-inside: avoid;
    }
  }
`;

export function createPrintStyleElement() {
  const printStyle = document.createElement('style');
  printStyle.textContent = PRINT_STYLE_CONTENT;
  return printStyle;
}
