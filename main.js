const signUpForm = document.querySelector('.signup-form');
const loginForm = document.querySelector('.login-form');
const profile = document.querySelector('.profileScreen');
const signUpScreen = document.querySelector('.signUpScreen');
const loginScreen = document.querySelector('.loginScreen');
const navLinks = document.querySelector('.nav-links');

const switchToLogin = () => {
    profile.classList.add('hidden')
    signUpScreen.classList.remove('hidden')
    loginScreen.classList.add('hidden')
    navLinks.classList.add('hidden')
}

signUpForm.addEventListener('submit', async(e) => {
    e.preventDefault()

    const name = document.querySelector('#signup-name').value
    const email = document.querySelector('#signup-email').value
    const password = document.querySelector('#signup-password').value

    try {
        const response = await axios.post('http://localhost:3001/user', {
            name: name,
            email: email,
            password: password
        })
        console.log(response)
        const userId = response.data.user.id
        console.log(userId)
        const userName = response.data.user.name
        localStorage.setItem('userId', userId) 
        localStorage.setItem('userName', userName) 
    } catch (error) {
        console.log(error)
        alert(error)
    }
}) 

loginForm.addEventListener('submit', async(e) => {
    e.preventDefault()

    const email = document.querySelector('#login-email').value
    const password = document.querySelector('#login-password').value

    try {
        const response = await axios.post('http://localhost:3001/user/login', {
            email: email,
            password: password
        })
        const userId = response.data.id
        console.log(response.data)
        const userName = response.data.name
        localStorage.setItem('userId', userId) 
        localStorage.setItem('userName', userName) 
    } catch (error) {
      console.log(error)
      alert(error)
    }
})