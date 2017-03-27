const { Gpio } = require('pigpio')

const {
  PIN_ID,
  RANGE
} = require('./constants')

const pin = new Gpio(PIN_ID, { mode: Gpio.OUTPUT })

const maxPower = 80
let currentPower = 0
let interval

function requestInterval(toBeEnabled) {
  if (interval) {
    clearInterval(interval)
  }

  const step = maxPower / 10 * (toBeEnabled ? 1 : -1)
  const goal = toBeEnabled ? maxPower : 0
  if (currentPower === goal) {
    return
  }

  interval = setInterval(() => {
    currentPower += step
    pin.pwmWrite(currentPower)

    if (
      toBeEnabled ?
        currentPower >= goal :
        currentPower <= goal
    ) {
      clearInterval(interval)
      interval = undefined
    }
  }, 100)
}

function start() {
  requestInterval(true)
}

function stop() {
  requestInterval(false)
}

module.exports = {
  start,
  stop
}
