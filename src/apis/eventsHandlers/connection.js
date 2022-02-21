module.exports = (wsEventEmitter) => {
  console.log(`user:: ${wsEventEmitter.socket.id} ::connected`)
}
