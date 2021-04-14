
const signUpForm = document.querySelector('.signup-form');
const loginForm = document.querySelector('.login-form');
const profile = document.querySelector('.profileScreen');
const signUpScreen = document.querySelector('.signUpScreen');
const loginScreen = document.querySelector('.loginScreen');
const navLinks = document.querySelector('.nav-links');
const searchResults = document.querySelector('.searchResults')
const searchForm = document.querySelector('.search-form')

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

const switchToMyProfile = () => {
    profile.classList.remove('hidden')
    signUpScreen.classList.add('hidden')
    loginScreen.classList.add('hidden')
    searchForm.classList.add('hidden')
    navLinks.classList.remove('hidden')
    document.querySelector('.saveSearch').classList.add('hidden')
    document.querySelector('.deleteSearch').classList.remove('hidden')
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
        // console.log(response.data)
        const userName = response.data.name
        localStorage.setItem('userId', userId) 
        localStorage.setItem('userName', userName) 
        switchToProfile()
    } catch (error) {
      console.log(error)
      alert(error)
    }
})
let searchLocation = ''
// const searchForm = document.querySelector('.search-form')
  searchForm.addEventListener('submit', async(e) => {
    e.preventDefault()
    try {
     let searchBar = document.querySelector('#city-search').value
      console.log(searchBar)
      const response = await axios.post('http://localhost:3001/city/search', {
          city: searchBar.charAt(0).toUpperCase()+searchBar.slice(1)
      })
      console.log(response.data)
      searchResults.innerHTML = ''
           for (let place of response.data.results) {
          let placeName = place.name
          let placeImage = place.images[0].sizes.medium.url
          let placeDescription = place.snippet
          
          
          showResults(placeName, placeImage, placeDescription)
      }
     

    let showCityName = document.querySelector('.show-city-name')
    showCityName.innerText = response.data.results[0].location_id
    searchLocation = response.data.results[0].location_id
      searchForm.reset()
    } catch (error) {
      console.log(error)
    }
  })

  
const showResults = (name, image, description) => {
    
    searchResults.classList.remove('hidden')
    let showCity = document.querySelector('.showCityName')
    showCity.classList.remove('hidden')

    let card = document.createElement('div')
    let placeName = document.createElement('h2')
    let placeImage = document.createElement('img')
    let placeDescription = document.createElement('p')
    
    card.classList.add('place-card')

    

    // let placeName = document.querySelector('.show-name')
    placeName.innerText = name

    // let showImage = document.querySelector('#show-image')
    placeImage.src = image
  

    // let showDescription = document.querySelector('.show-description')
    placeDescription.innerText = description

    card.append(placeName, placeImage, placeDescription)
    
    searchResults.append(card)
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

const saveSearch = document.querySelector('.saveSearch')
saveSearch.addEventListener('click', async (e) => {
    e.preventDefault()
    
    try {
        let userId = localStorage.getItem('userId')
  
    const res = await axios.post(`http://localhost:3001/city/${userId}/save/${searchLocation}`)
   
    console.log(res)
    } catch (error) {
        console.log(res)
    }
})


let deleteSingle = async (searchLocation) => {
    let userId = localStorage.getItem('userId')
    let res = await axios.delete(`http://localhost:3001/user/${userId}/delete/${searchLocation}`)
    console.log(res)
    switchToProfile()
}

const myProfile = document.querySelector('#profile-link')
myProfile.addEventListener('click', () => {
    switchToMyProfile()
})

const home = document.querySelector('#home-link')
home.addEventListener('click', () => {
    switchToProfile()
})

const deleteButton = document.querySelector('.deleteSearch')
deleteButton.addEventListener('click', (e) => {
    e.preventDefault()
    deleteSingle(searchLocation)
})