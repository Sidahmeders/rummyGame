const formTextElements = ['username', 'email', 'password', 'age', 'country', 'city']

export default function SignUp() {
  const signupContainer = document.getElementById('signup')
  const signupForm = document.createElement('form')

  const h2El = document.createElement('h2')
  h2El.innerText = 'SignUp'

  formTextElements.forEach((elText) => {
    const inputElement = document.createElement('input')
    inputElement.placeholder = elText
    signupForm.appendChild(inputElement)
  })

  signupContainer.appendChild(h2El)
  signupContainer.appendChild(signupForm)
}
