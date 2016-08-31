import assert from 'assert'
import cheerio from 'cheerio'
import fs from 'fs'

import { clean } from './utils/dom/test-helpers'

import GenericContentExtractor from './extractor'

describe('GenericContentExtractor', () => {
  describe('parse(html, opts)', () => {
    it("parses html and returns the article", () => {
      const html = fs.readFileSync('../fixtures/latimes.html', 'utf-8')

      const result = clean(GenericContentExtractor.parse(null, html))
      console.log(result)
    })
  })
})