let timeOut = true
export default function (message) {
  const oldAlertElement = document.getElementById('alert')
  const newAlertElement = document.createElement('div')
  newAlertElement.id = 'alert'

  const childNode = document.createElement('div')
  childNode.innerText = message

  newAlertElement.appendChild(childNode)
  newAlertElement.classList.add('error')

  if (timeOut) {
    timeOut = false
    setTimeout(() => {
      document.getElementById('alert').childNodes.forEach((node) => node.remove())
      timeOut = true
    }, 6500)
  }

  oldAlertElement.replaceWith(newAlertElement)
}
