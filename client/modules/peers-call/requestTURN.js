export default function requestTurn(turnURL) {
  let turnExists = false
  for (let i in window.pcConfig.iceServers) {
    if (window.pcConfig.iceServers[i].urls.substr(0, 5) === 'turn:') {
      turnExists = true
      window.turnReady = true
      break
    }
  }
  if (!turnExists) {
    console.log('Getting TURN server from ', turnURL)
    // No TURN server. Get one from computeengineondemand.appspot.com:
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        let turnServer = JSON.parse(xhr.responseText)
        window.pcConfig.iceServers.push({
          urls: 'turn:' + turnServer.username + '@' + turnServer.turn,
          credential: turnServer.password,
        })
        window.turnReady = true
      }
    }
    xhr.open('GET', turnURL, true)
    xhr.send()
  }
}
