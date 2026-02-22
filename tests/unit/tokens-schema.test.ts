import { readFileSync } from 'fs'

const tokens = JSON.parse(readFileSync(new URL('../../src/lib/tokens/tokens.v1.json', import.meta.url), 'utf8'))
const themes = JSON.parse(readFileSync(new URL('../../src/lib/tokens/themes.v1.json', import.meta.url), 'utf8'))

describe('tokens schema', () => {
  test('tokens file has tokens array', () => {
    expect(Array.isArray(tokens.tokens)).toBe(true)
    expect(tokens.tokens.length).toBeGreaterThan(0)
  })

  test('each semantic token present in themes for each mode/contrast', () => {
    const semanticIds = tokens.tokens.filter(t => t.layer === 'semantic').map(t => t.id)
    const modes = Object.keys(themes.modes || {})
    for (const mode of modes) {
      const contrasts = Object.keys(themes.modes[mode] || {})
      for (const contrast of contrasts) {
        const map = themes.modes[mode][contrast] || {}
        for (const id of semanticIds) {
          expect(Object.prototype.hasOwnProperty.call(map, id)).toBe(true)
        }
      }
    }
  })
})
