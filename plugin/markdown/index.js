const HyperDown = require('./js/Parser')
const Prism = require('prismjs')

function markdownLoader (val) {
  // loader执行，从右往左，从下往上。
  let parser = new HyperDown({
    parseHTML: false,
    newLine: false,
    yourTags: 'slot|template|Button|code-wrap'
  })
  let html = parser.makeHtml(val)
  html = html.replace(
    /(?<=<pre><code[^>]*?>)[\s\S]*?(?=<\/code><\/pre>)/gi,
    (v) => {
      return Prism.highlight(v, Prism.languages.javascript)
    }
  )

  return `<template><div class="markdown">${html}</div></template>`
}

module.exports = markdownLoader
