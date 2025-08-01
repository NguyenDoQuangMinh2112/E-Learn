// Enhanced markdown parser để xử lý response từ API
export const parseMarkdown = (text: string): string => {
  let formatted = text

  // Handle code blocks first (```language\ncode\n```)
  formatted = formatted.replace(/```(\w+)?\n?([\s\S]*?)```/g, (match, lang, code) => {
    const language = lang || 'javascript'
    const highlightedCode = highlightSyntax(code.trim(), language)
    return `<div class="code-block-container"><div class="code-block-header"><span class="code-language">${language}</span><button class="copy-button" onclick="copyToClipboard(this)" data-code="${encodeURIComponent(
      code.trim()
    )}"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg></button></div><pre><code>${highlightedCode}</code></pre></div>`
  })

  // Handle inline code
  formatted = formatted.replace(/`([^`\n]+)`/g, '<code class="inline-code">$1</code>')

  // Handle bold text (**text**)
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')

  // Handle italic text (*text*)
  formatted = formatted.replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, '<em>$1</em>')

  // Handle headers (## Header)
  formatted = formatted.replace(/^#{1,6}\s+(.+)$/gm, (match, text) => {
    const level = match.indexOf(' ')
    return `<h${level} class="markdown-header">${text}</h${level}>`
  })

  // Split into lines for processing
  const lines = formatted.split('\n')
  const processedLines = []
  let inList = false
  let inOrderedList = false
  let listItems = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    const nextLine = i < lines.length - 1 ? lines[i + 1].trim() : ''

    // Handle numbered lists (1. item, 2. item, etc.)
    if (/^\d+\.\s+/.test(line)) {
      if (!inOrderedList) {
        if (inList) {
          processedLines.push('</ul>')
          inList = false
        }
        inOrderedList = true
        listItems = []
      }
      const content = line.replace(/^\d+\.\s+/, '')
      listItems.push(`<li>${content}</li>`)

      // Check if next line is not a numbered list item
      if (!nextLine || !/^\d+\.\s+/.test(nextLine)) {
        processedLines.push(`<ol class="ordered-list">${listItems.join('')}</ol>`)
        inOrderedList = false
        listItems = []
      }
    }
    // Handle bullet points
    else if (line.startsWith('* ') || line.startsWith('- ')) {
      if (!inList) {
        if (inOrderedList) {
          processedLines.push(`<ol class="ordered-list">${listItems.join('')}</ol>`)
          inOrderedList = false
          listItems = []
        }
        inList = true
        listItems = []
      }
      const content = line.substring(2)
      listItems.push(`<li>${content}</li>`)

      // Check if next line is not a bullet point
      if (!nextLine || (!nextLine.startsWith('* ') && !nextLine.startsWith('- '))) {
        processedLines.push(`<ul class="bullet-list">${listItems.join('')}</ul>`)
        inList = false
        listItems = []
      }
    }
    // Handle empty lines
    else if (line === '') {
      if (inList) {
        processedLines.push(`<ul class="bullet-list">${listItems.join('')}</ul>`)
        inList = false
        listItems = []
      }
      if (inOrderedList) {
        processedLines.push(`<ol class="ordered-list">${listItems.join('')}</ol>`)
        inOrderedList = false
        listItems = []
      }
      processedLines.push('<br>')
    }
    // Handle regular paragraphs
    else {
      if (inList) {
        processedLines.push(`<ul class="bullet-list">${listItems.join('')}</ul>`)
        inList = false
        listItems = []
      }
      if (inOrderedList) {
        processedLines.push(`<ol class="ordered-list">${listItems.join('')}</ol>`)
        inOrderedList = false
        listItems = []
      }

      // Don't wrap code blocks or headers in paragraphs
      if (!line.includes('<div class="code-block-container">') && !line.includes('<h')) {
        processedLines.push(`<p>${line}</p>`)
      } else {
        processedLines.push(line)
      }
    }
  }

  // Close any remaining lists
  if (inList) {
    processedLines.push(`<ul class="bullet-list">${listItems.join('')}</ul>`)
  }
  if (inOrderedList) {
    processedLines.push(`<ol class="ordered-list">${listItems.join('')}</ol>`)
  }

  return processedLines.join('')
}

// Enhanced syntax highlighting
const highlightSyntax = (code: string, language: string): string => {
  if (language.toLowerCase() === 'javascript' || language.toLowerCase() === 'js') {
    return highlightJavaScript(code)
  }
  return escapeHtml(code)
}

const highlightJavaScript = (code: string): string => {
  // Escape HTML first
  let highlighted = escapeHtml(code)

  // Keywords
  const keywords = [
    'async',
    'await',
    'break',
    'case',
    'catch',
    'class',
    'const',
    'continue',
    'debugger',
    'default',
    'delete',
    'do',
    'else',
    'export',
    'extends',
    'finally',
    'for',
    'function',
    'if',
    'import',
    'in',
    'instanceof',
    'let',
    'new',
    'return',
    'super',
    'switch',
    'this',
    'throw',
    'try',
    'typeof',
    'var',
    'void',
    'while',
    'with',
    'yield'
  ]

  // Built-in objects and methods
  const builtins = [
    'console',
    'log',
    'error',
    'warn',
    'Array',
    'Object',
    'String',
    'Number',
    'Boolean',
    'Date',
    'Math',
    'JSON',
    'Promise',
    'fetch',
    'map',
    'filter',
    'reduce',
    'forEach',
    'push',
    'pop',
    'shift',
    'unshift',
    'slice',
    'splice',
    'indexOf',
    'includes'
  ]

  // Highlight keywords
  keywords.forEach((keyword) => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'g')
    highlighted = highlighted.replace(regex, `<span class="syntax-keyword">${keyword}</span>`)
  })

  // Highlight built-ins
  builtins.forEach((builtin) => {
    const regex = new RegExp(`\\b${builtin}\\b`, 'g')
    highlighted = highlighted.replace(regex, `<span class="syntax-builtin">${builtin}</span>`)
  })

  // Highlight strings (both single and double quotes)
  highlighted = highlighted.replace(/(["'])((?:(?!\1)[^\\]|\\.)*)(\1)/g, '<span class="syntax-string">$1$2$3</span>')

  // Highlight template literals
  highlighted = highlighted.replace(/(`)((?:(?!`)[^\\]|\\.)*)(`)/g, '<span class="syntax-string">$1$2$3</span>')

  // Highlight numbers
  highlighted = highlighted.replace(/\b\d+\.?\d*\b/g, '<span class="syntax-number">$&</span>')

  // Highlight comments
  highlighted = highlighted.replace(/\/\/.*$/gm, '<span class="syntax-comment">$&</span>')
  highlighted = highlighted.replace(/\/\*[\s\S]*?\*\//g, '<span class="syntax-comment">$&</span>')

  // Highlight operators
  const operators = ['===', '!==', '==', '!=', '<=', '>=', '&&', '||', '=>', '++', '--']
  operators.forEach((op) => {
    const escapedOp = op.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(escapedOp, 'g')
    highlighted = highlighted.replace(regex, `<span class="syntax-operator">${op}</span>`)
  })

  return highlighted
}

const escapeHtml = (text: string): string => {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

// Global function for copy functionality
if (typeof window !== 'undefined') {
  ;(window as any).copyToClipboard = async (button: HTMLButtonElement) => {
    const code = decodeURIComponent(button.dataset.code || '')
    try {
      await navigator.clipboard.writeText(code)
      const originalContent = button.innerHTML
      button.innerHTML =
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>'
      button.classList.add('copied')
      setTimeout(() => {
        button.innerHTML = originalContent
        button.classList.remove('copied')
      }, 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }
}
