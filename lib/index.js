const { DURATION } = require('./constants')
const { listen } = require('./feed')
const { start, stop } = require('./pin')

function begin() {
  start()
  console.log('Start Train')
}

function end() {
  stop()
  console.log('Stop Train')
}

listen(() => {
  begin()
  clearTimeout(end)
  setTimeout(end, DURATION)
})
