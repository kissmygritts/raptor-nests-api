const nullifyProps = (obj) =>
  Object.keys(obj).reduce((acc, key) => {
    return Object.assign(acc, {
      [key]: obj[key] === '' ? null : obj[key]
    })
  }, {})

const nullifyEmptyProps = (obj) => {
  return obj ? nullifyProps(obj) : undefined
}

module.exports = {
  nullifyEmptyProps
}
