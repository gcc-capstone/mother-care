// Generate both export formats locally; no application data leaves the browser.
function pdfText(value: string) {
  return value.replace(/[^\x20-\x7e]/g, '-').replace(/([\\()])/g, '\\$1')
}
function makePdf(lines: string[]) {
  const stream = `BT /F1 12 Tf 50 780 Td 18 TL ${lines.map((line, index) => `${index ? 'T* ' : ''}(${pdfText(line)}) Tj`).join('\n')} ET`
  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
  ]
  let content = '%PDF-1.4\n'
  const offsets = [0]
  objects.forEach((object, index) => {
    offsets.push(content.length)
    content += `${index + 1} 0 obj\n${object}\nendobj\n`
  })
  const xref = content.length
  content += `xref\n0 6\n0000000000 65535 f \n${offsets
    .slice(1)
    .map((offset) => `${String(offset).padStart(10, '0')} 00000 n \n`)
    .join('')}trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`
  return content
}
export function downloadReport(
  format: 'CSV' | 'PDF',
  title: string,
  rows: [string, string | number][],
) {
  const csv = rows
    .map((row) =>
      row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(','),
    )
    .join('\r\n')
  const content =
    format === 'CSV'
      ? csv
      : makePdf([
          title,
          '',
          ...rows.map(([label, value]) => `${label}: ${value}`),
        ])
  const blob = new Blob([content], {
    type: format === 'CSV' ? 'text/csv;charset=utf-8' : 'application/pdf',
  })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `mothercare-summary.${format.toLowerCase()}`
  link.click()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}
