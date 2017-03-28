import pkg from '../package.json'
import definePlugin from './define-plugin'

describe('define-plugin', () => {
  describe('if something is not defined', () => {
    const config = { env: {} }
    let result

    beforeEach(() => {
      result = definePlugin(config)
    })

    it('should set the the NODE_ENV to `null`', () => {
      expect(result.process.env.NODE_ENV).toBe('null')
    })
  })

  describe('if something is not defined', () => {
    const config = {
      env: {
        NODE_ENV: 'such-environment',
        DEBUG: 'very-debug',
        ANALYTICS_CODE: 'wow'
      }
    }
    let result

    beforeEach(() => {
      result = definePlugin(config)
    })

    it('should set the the NODE_ENV', () => {
      expect(result.process.env.NODE_ENV).toBe(`'${config.env.NODE_ENV}'`)
    })

    it('should set the the DEBUG', () => {
      expect(result.process.env.DEBUG).toBe(`'${config.env.DEBUG}'`)
    })

    it('should set the the ANALYTICS_CODE', () => {
      expect(result.process.env.ANALYTICS_CODE).toBe(`'${config.env.ANALYTICS_CODE}'`)
    })

    it('should set the VERSION', () => {
      expect(result.process.env.VERSION).toBe(`'${pkg.version}'`)
    })
  })
})
