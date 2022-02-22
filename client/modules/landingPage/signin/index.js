const formTextElements = ['email', 'password']

export default function SignUp() {
  const authContainer = document.getElementById('auth-container')

  const signupContainer = document.createElement('div')
  signupContainer.className = 'signin hide'

  const h2El = document.createElement('h2')
  h2El.innerText = 'SignIn'

  const signupForm = document.createElement('form')
  formTextElements.forEach((elText) => {
    const inputElement = document.createElement('input')
    inputElement.placeholder = elText
    signupForm.appendChild(inputElement)
  })

  signupContainer.appendChild(h2El)
  signupContainer.appendChild(signupForm)

  authContainer.appendChild(signupContainer)
}
