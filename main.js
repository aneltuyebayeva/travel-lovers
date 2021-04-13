
const signUpForm = document.querySelector('.signup-form');
const loginForm = document.querySelector('.login-form');
const profile = document.querySelector('.profileScreen');
const signUpScreen = document.querySelector('.signUpScreen');
const loginScreen = document.querySelector('.loginScreen');
const navLinks = document.querySelector('.nav-links');

const switchToProfile = () => {
    profile.classList.remove('hidden')
    signUpScreen.classList.add('hidden')
    loginScreen.classList.add('hidden')
    navLinks.classList.remove('hidden')
    let userName = document.querySelector('.userName')
    let usersName = localStorage.getItem('userName')
    if(usersName !== undefined) {
        userName.innerText = `Welcome ${usersName}`
    }
}
const switchToLogin = () => {
    profile.classList.add('hidden')
    signUpScreen.classList.add('hidden')
    loginScreen.classList.remove('hidden')
    navLinks.classList.add('hidden')
}

let signUpButton= document.querySelector('.signUpButton')
const switchToSignUp = () => {
    profile.classList.add('hidden')
    signUpScreen.classList.remove('hidden')
    loginScreen.classList.add('hidden')
}
signUpButton.addEventListener('click', () => {
    switchToSignUp()
})

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
        switchToProfile()
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
        switchToProfile()
    } catch (error) {
      console.log(error)
      alert(error)
    }
})

const searchForm = document.querySelector('.search-form')
  searchForm.addEventListener('submit', async(e) => {
    e.preventDefault()
    try {
     let searchBar = document.querySelector('#city-search').value
      console.log(searchBar)
      const response = await axios.post('http://localhost:3001/city/search', {
          city: searchBar.charAt(0).toUpperCase()+searchBar.slice(1)
      })
      console.log(response.data)
      showResults(response.data)
      searchForm.reset()
    } catch (error) {
      console.log(error)
    }
  })

  
const showResults = (data) => {
   
    let searchResults = document.querySelector('.searchResults')
    searchResults.classList.remove('hidden')
    let showCity = document.querySelector('.showCityName')
    showCity.classList.remove('hidden')

    let showCityName = document.querySelector('.show-city-name')
    showCityName.innerText = data.results[0].location_id

    let showName = document.querySelector('.show-name')
    showName.innerText = data.results[0].name

    let showImage = document.querySelector('#show-image')
    showImage.src = data.results[0].images[0].sizes.thumbnail.url
  

    let showDescription = document.querySelector('.show-description')
    showDescription.innerText = data.results[0].snippet
}

const loginButton = document.querySelector('.loginButton')

loginButton.addEventListener('click', () => {
    switchToLogin()
})

const logoutButton = document.querySelector('#logout-link')

logoutButton.addEventListener('click', () => {
    localStorage.clear()
    switchToLogin()
})
