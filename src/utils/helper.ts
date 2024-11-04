export const formatPrice = (number: number) => Number(number?.toFixed(1)).toLocaleString()

export function getLastTwoNames(fullName: string) {
  const names = fullName.trim().split(' ')
  const lastTwoNames = names.slice(-2)
  return lastTwoNames.join(' ')
}

export function convertName(name: string): string {
  // Chuyển đổi thành chữ thường
  let lowerCaseName = name.toLowerCase()

  // Thay thế ký tự có dấu
  lowerCaseName = lowerCaseName
    .replace(/đ/g, 'd')
    .normalize('NFD') // Đảm bảo ký tự được phân tách
    .replace(/[\u0300-\u036f]/g, '') // Loại bỏ dấu
    .replace(/[^\w\s-]/g, '') // Loại bỏ ký tự đặc biệt, giữ lại chữ cái, số, khoảng trắng và dấu gạch nối

  // Thay thế khoảng trắng bằng dấu gạch nối
  lowerCaseName = lowerCaseName.replace(/\s+/g, '-')

  return lowerCaseName
}

// Limited words
export const checkLengthOfWords = (html: string, number: number) => {
  // Chuyển đổi HTML thành văn bản thuần túy
  const doc = new DOMParser().parseFromString(html, 'text/html')
  const text = doc.body.innerText || ''

  if (text.length > number) {
    return `${text.slice(0, number)} ...`
  } else {
    return text
  }
}
