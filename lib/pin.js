const { Gpio } = require('pigpio')

const {
  PIN_ID,
  RANGE
} = require('./constants')

const pin = new Gpio(PIN_ID, { mode: Gpio.OUTPUT })

function start() {
  pin.pwmWrite(50) // max: 255
}

function stop() {
  pin.pwmWrite(0)
}

module.exports = {
  start,
  stop
}
