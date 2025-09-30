export class TemplateEngine {
  constructor(options = {}) {
    this.options = { openTag: '{{', closeTag: '}}', helpers: {}, ...options }
    this.registerHelper('if', this.ifHelper.bind(this))
    this.registerHelper('each', this.eachHelper.bind(this))
    this.registerHelper('unless', this.unlessHelper.bind(this))
  }
  registerHelper(name, fn) {
    this.options.helpers[name] = fn
    return this
  }
  compile(template) {
    return (data = {}) => this.render(template, data)
  }
  render(template, data = {}) {
    const { openTag, closeTag } = this.options
    const regex = new RegExp(`${this.escapeRegex(openTag)}\\s*([^}]+)\\s*${this.escapeRegex(closeTag)}`, 'g')
    return template.replace(regex, (match, expression) => {
      return this.evaluateExpression(expression.trim(), data)
    })
  }
  evaluateExpression(expression, data) {
    // Handle helpers
    if (expression.includes(' ')) {
      const parts = expression.split(' ')
      const helperName = parts[0]
      if (this.options.helpers[helperName]) {
        const args = parts.slice(1).map((arg) => this.getValue(arg, data))
        return this.options.helpers[helperName](...args, data)
      }
    }
    // Handle simple variable substitution
    return this.getValue(expression, data) || ''
  }
  getValue(path, data) {
    if (path.startsWith('"') && path.endsWith('"')) {
      return path.slice(1, -1) // String literal
    }
    if (!isNaN(path)) {
      return Number(path) // Number literal
    }
    return path.split('.').reduce((obj, key) => obj && obj[key], data)
  }
  escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  }
  // Built-in helpers
  ifHelper(condition, data) {
    return condition ? '<!-- if-true -->' : '<!-- if-false -->'
  }
  eachHelper(array, data) {
    if (!Array.isArray(array)) return ''
    return '<!-- each-placeholder -->'
  }
  unlessHelper(condition, data) {
    return !condition ? '<!-- unless-true -->' : '<!-- unless-false -->'
  }
}

// Enhanced version with block helpers
class AdvancedTemplateEngine extends TemplateEngine {
  render(template, data = {}) {
    // First pass: handle block helpers
    template = this.handleBlockHelpers(template, data)
    // Second pass: handle regular expressions
    return super.render(template, data)
  }
  handleBlockHelpers(template, data) {
    const blockRegex = /{{#(\w+)\s+([^}]+)}}([\s\S]*?){{\/\1}}/g
    return template.replace(blockRegex, (match, helperName, args, content) => {
      if (helperName === 'each') {
        const arrayPath = args.trim()
        const array = this.getValue(arrayPath, data)
        if (!Array.isArray(array)) return ''
        return array
          .map((item, index) => {
            const itemData = { ...data, this: item, '@index': index }
            return this.render(content, itemData)
          })
          .join('')
      }
      if (helperName === 'if') {
        const condition = this.getValue(args.trim(), data)
        return condition ? this.render(content, data) : ''
      }
      if (helperName === 'unless') {
        const condition = this.getValue(args.trim(), data)
        return !condition ? this.render(content, data) : ''
      }
      return match
    })
  }
}

// Usage examples
const engine = new AdvancedTemplateEngine() // Register custom helpers
engine.registerHelper('uppercase', (str) => str.toUpperCase())
engine.registerHelper('currency', (amount) => `$${amount.toFixed(2)}`)
const template = `<h1>Welcome, {{ name }}!</h1>
<p>Your balance is {{ currency balance }}</p>
{{#if isVip}}
	<div class="vip-section">  
		<h2>VIP Benefits</h2>  
		<ul>    
			{{#each benefits}}    
			<li>{{ uppercase this }}</li>    
			{{/each}}  
		</ul>
	</div>
{{/if}}
{{#unless isActive}}
	<div class="inactive-warning">  Please activate your account.</div>
{{/unless}}`
const data = {
  name: 'John Doe',
  balance: 1234.56,
  isVip: true,
  isActive: false,
  benefits: ['priority support', 'exclusive offers', 'early access']
}
const compiled = engine.compile(template)
const result = compiled(data)
console.log(result)
