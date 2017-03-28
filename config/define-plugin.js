import pkg from '../package.json'

export default config => {
  const env = (property, fallback = null) => config.env[property]
  ? `'${config.env[property]}'`
  : `${fallback}`

  return {
    process: {
      env: {
        NODE_ENV: env('NODE_ENV'),
        DEBUG: env('DEBUG'),
        ANALYTICS_CODE: env('ANALYTICS_CODE'),
        VERSION: `'${pkg.version}'`
      }
    }
  }
}
