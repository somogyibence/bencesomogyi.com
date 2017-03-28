const emptyAction = { type: '' }

export default ({ ga }, { env: { ANALYTICS_CODE } }) => ({
  create: () => {
    ga('create', ANALYTICS_CODE, 'auto')
    return emptyAction
  }
})
