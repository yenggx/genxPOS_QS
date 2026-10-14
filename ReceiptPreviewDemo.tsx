import React, { useMemo } from 'react';

// --- Parsing functions from your sample code ---
function resolvePlaceholders(html: string, cfg: Record<string, string>): string {
  if (!html) return '';
  return html.replace(
    /\{\{process\.env\.(NEXT_PUBLIC_[^}]+)\}\}/g,
    (_, key: string) => String(cfg[key] ?? key),
  );
}

function quillToReceiptHtml(raw: string, cfg: Record<string, string>): string {
  if (!raw) return '';
  return resolvePlaceholders(raw, cfg)
    .replace(
      /<p([^>]*?)class="([^\"]*\bql-align-center\b[^\"]*)"([^>]*)>/g,
      '<p$1style="text-align:center;margin:0;line-height:1.4;color:#000;font-weight:bold;"$3>',
    )
    .replace(
      /<p([^>]*?)class="([^\"]*\bql-align-right\b[^\"]*)"([^>]*)>/g,
      '<p$1style="text-align:right;margin:0;line-height:1.4;color:#000;font-weight:bold;"$3>',
    )
    .replace(/\s*class="[^\"]*"/g, '')
    .replace(/<p>/g, '<p style="margin:0;line-height:1.4;color:#000;font-weight:bold;">')
    .replace(
      /<p style="(?!text-align|margin)([^\"]*)">/g,
      '<p style="margin:0;line-height:1.4;color:#000;font-weight:bold;$1">',
    );
}

// --- Demo component ---
export default function ReceiptPreviewDemo({
  receiptFormats,
  selectedFormatId,
  fiscalFields,
}: {
  receiptFormats: Array<{ id: number; name: string; header: string; footer: string }>;
  selectedFormatId: number;
  fiscalFields: {
    vatNumber: string;
    tinNumber: string;
    minNumber: string;
    ptuNumber: string;
    snNumber: string;
  };
}) {
  const selectedFormat = useMemo(
    () => receiptFormats.find(f => f.id === selectedFormatId),
    [receiptFormats, selectedFormatId]
  );

  const config = useMemo(() => ({
    NEXT_PUBLIC_VAT: fiscalFields.vatNumber,
    NEXT_PUBLIC_TIN: fiscalFields.tinNumber,
    NEXT_PUBLIC_MIN: fiscalFields.minNumber,
    NEXT_PUBLIC_PTU: fiscalFields.ptuNumber,
    NEXT_PUBLIC_SERIALNO: fiscalFields.snNumber,
  }), [fiscalFields]);

  const parsedHeader = selectedFormat ? quillToReceiptHtml(selectedFormat.header, config) : '';
  const parsedFooter = selectedFormat ? quillToReceiptHtml(selectedFormat.footer, config) : '';

  if (!selectedFormat) return <div style={{ color: '#aaa', textAlign: 'center' }}>No format selected</div>;

  return (
    <div style={{ background: '#fff', borderRadius: 8, padding: 20, maxWidth: 320, margin: '0 auto', border: '1px solid #ddd' }}>
      <div dangerouslySetInnerHTML={{ __html: parsedHeader }} />
      <hr style={{ border: 'none', borderTop: '1px dashed #ccc', margin: '12px 0' }} />
      <div style={{ textAlign: 'center', fontSize: 10, color: '#999', margin: '12px 0' }}>Sample Items</div>
      <hr style={{ border: 'none', borderTop: '1px dashed #ccc', margin: '12px 0' }} />
      <div dangerouslySetInnerHTML={{ __html: parsedFooter }} />
    </div>
  );
}
