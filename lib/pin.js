const rpio = require('rpio')

const {
  PIN_ID,
  RANGE
} = require('./constants')

rpio.init({
  gpiomem: false, // We need root access for PWM
  mapping: 'gpio' // BCM Mapping for Pi rev3
})

function start() {
  rpio.open(PIN_ID, rpio.PWM)
  rpio.pwmSetClockDivider(256) // 75kHz
  rpio.pwmSetRange(PIN_ID, RANGE)
  rpio.pwmSetData(PIN_ID, RANGE / 1) // Set output to 50%
}

function stop() {
  rpio.close(PIN_ID)
}

process.on('beforeExit', () => {
  stop()
})

module.exports = {
  start,
  stop
}
