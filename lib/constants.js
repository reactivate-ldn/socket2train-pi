require('dotenv').config()

const {
  PIN_ID,
  ENDPOINT,
  DURATION
} = process.env

const pinId = PIN_ID ? parseInt(PIN_ID, 10) : 12

const endpoint = ENDPOINT || 'wss://feed.reactivate.london'
const duration = (DURATION ? parseInt(DURATION, 10) : 4) * 1000

console.log('PIN_ID = ' + pinId)
console.log('ENDPOINT = ' + endpoint)
console.log('DURATION = ' + duration)

if (
  pinId !== 12 &&
  pinId !== 19 &&
  pinId !== 33 &&
  pinId !== 35
) {
  console.error('The BCM chipset supports hardware PWM only on pins 12, 19, 33, and 35.')
  process.exit(2)
} else if (duration > 9000) {
  console.error('It\'s over NINE THOUSAND!')
  process.exit(2)
}

module.exports = {
  PIN_ID: pinId,
  ENDPOINT: endpoint,
  RANGE: 1024,
  DURATION: duration
}
