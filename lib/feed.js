const io = require('socket.io-client')
const { ENDPOINT } = require('./constants')

const socket = io(ENDPOINT)

let listeners = []

socket.on('connect', () => {
  console.log('Connect: Started connection with remote.')
});

socket.on('tweet', tweet => {
  console.log('Tweet: "' + tweet.text + '"')

  listeners.forEach(listener => {
    listener(tweet)
  })
});

socket.on('disconnect', () => {
  console.warn('Disconnect: Remote ended connection.')
  process.exit(1)
});

function listen(listener) {
  listeners.push(listener)
}

function unlisten(listener) {
  listeners = listeners.filter(x => x === listener)
}

module.exports = {
  listen,
  unlisten
}
