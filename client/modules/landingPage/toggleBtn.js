export default function Toggle() {
  const toggleBtn = document.getElementById('toggle-btn')

  const iconElement = document.createElement('div')
  iconElement.className = 'off'
  iconElement.onclick = clickHandler

  toggleBtn.appendChild(iconElement)
}

function clickHandler() {
  this.className = this.className == 'on' ? 'off' : 'on'
  const authContainer = document.getElementById('auth-container')

  authContainer.childNodes.forEach((node) => {
    if (node.classList.contains('hide')) node.classList.remove('hide')
    else node.classList.add('hide')
  })
}
