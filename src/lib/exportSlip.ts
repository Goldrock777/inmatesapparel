import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

async function renderCanvas(node: HTMLElement): Promise<HTMLCanvasElement> {
  return html2canvas(node, {
    scale: 2,
    backgroundColor: '#ffffff',
    useCORS: true,
  })
}

export async function exportNodeAsJpeg(
  node: HTMLElement,
  filename: string,
): Promise<void> {
  const canvas = await renderCanvas(node)
  const dataUrl = canvas.toDataURL('image/jpeg', 0.95)
  const link = document.createElement('a')
  link.href = dataUrl
  link.download = `${filename}.jpg`
  link.click()
}

export async function exportNodeAsPdf(
  node: HTMLElement,
  filename: string,
): Promise<void> {
  const canvas = await renderCanvas(node)

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'letter',
    compress: true,
  })

  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  const imgWidth = pageWidth
  const imgHeight = (canvas.height * imgWidth) / canvas.width

  if (imgHeight <= pageHeight) {
    pdf.addImage(
      canvas.toDataURL('image/jpeg', 0.92),
      'JPEG',
      0,
      0,
      imgWidth,
      imgHeight,
    )
  } else {
    // Slice the tall canvas across multiple letter pages.
    let renderedHeight = 0
    const pageCanvas = document.createElement('canvas')
    const pageCtx = pageCanvas.getContext('2d')
    const pxPerPage = Math.floor((canvas.width * pageHeight) / pageWidth)
    pageCanvas.width = canvas.width

    let first = true
    while (renderedHeight < canvas.height) {
      const sliceHeight = Math.min(pxPerPage, canvas.height - renderedHeight)
      pageCanvas.height = sliceHeight
      if (pageCtx) {
        pageCtx.fillStyle = '#ffffff'
        pageCtx.fillRect(0, 0, pageCanvas.width, sliceHeight)
        pageCtx.drawImage(
          canvas,
          0,
          renderedHeight,
          canvas.width,
          sliceHeight,
          0,
          0,
          canvas.width,
          sliceHeight,
        )
      }
      const sliceData = pageCanvas.toDataURL('image/jpeg', 0.92)
      const sliceRenderHeight = (sliceHeight * imgWidth) / canvas.width
      if (!first) pdf.addPage()
      pdf.addImage(sliceData, 'JPEG', 0, 0, imgWidth, sliceRenderHeight)
      renderedHeight += sliceHeight
      first = false
    }
  }

  pdf.save(`${filename}.pdf`)
}
