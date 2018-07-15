const webstore = require('chrome-webstore')
const millify = require('millify')

const round = (value, decimals) =>
  Number(Math.round(value + 'e' + decimals) + 'e-' + decimals)

const stars = (average) => {
  const base = Math.floor(average)
  const fraction = average - base
  return ((full = ''.padEnd(base, '★')) =>
    // TODO: update when Unicode 11 goes mainstream
    // between 0.33 and 0.66 should be `half star` symbol
    fraction >= 0.33 && fraction <= 0.66 ? full.padEnd(base + 1, '★') :
    fraction > 0.66 ? full.padEnd(base + 1, '★') : full
  )().padEnd(5, '☆')
}

module.exports = async function (method, ...args) {
  const meta = await webstore.detail({id: args[0]})
  switch (method) {
    case 'v':
      return {
        subject: 'chrome web store',
        status: meta.version,
        color: 'blue'
      }
    case 'users':
      return {
        subject: 'users',
        status: millify(parseInt(meta.users.replace(',', ''))),
        color: 'green'
      }
    case 'price':
      return {
        subject: 'price',
        status: meta.price,
        color: 'green'
      }
    case 'rating':
      return {
        subject: 'rating',
        status: `${round(meta.rating.average, 2)}/5`,
        color: 'green'
      }
    case 'stars':
      return {
        subject: 'stars',
        status: stars(meta.rating.average),
        color: 'green'
      }
    case 'rating-count':
      return {
        subject: 'rating count',
        status: `${meta.rating.count} total`,
        color: 'green'
      }
    default:
      return {
        subject: 'chrome',
        status: 'unknown',
        color: 'grey'
      }
  }
}
