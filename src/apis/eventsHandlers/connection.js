module.exports = ({ wsEventEmitter }) => {
  return () => {
    console.log(`user:: ${wsEventEmitter.socket.id} ::connected`)
  }
}
