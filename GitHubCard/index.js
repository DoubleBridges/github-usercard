/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

function createUserCard(user) {
  return axios.get(`https://api.github.com/users/${user}`)
    .then(data => {
      console.log('9, retrieves user');
      gitCard(data.data)
    })

    .catch(err => console.log(err))
}

let followers = []

const getFollowers = arr => {
  console.log('19, getFollowers, pushes the followers into followers array')
  arr.forEach(follower => followers.push(follower.login)
  )
  createFollowerCards(followers)
  // return followers
}

function getUserFollowers(user) {
  return axios.get(`https://api.github.com/users/${user}/followers`)
    .then(dataArr => {
      console.log('28, getUserFollowers gets the user followers from github, calls getFollowers')

      getFollowers(dataArr.data)
    })

    .catch(err => console.log(err))
}

function createFollowerCards(arr) {
  arr.forEach(follower => {
    return axios.get(`https://api.github.com/users/${follower}`)
      .then(data => {
        console.log('40, createsFollowerCards by calling user follower API, calls gitCard', followers)

        gitCard(data.data)
      })
      .catch(err => console.log(err))
  })
}

const createGitPage = user => {
  console.log('49, creates git Page + calls createUserCard with a user')

  createUserCard(user)
    .then(getUserFollowers(user))
    // .then(createFollowerCards(followers))
    .catch(err => console.log(err))

  console.log(followers)
}

createGitPage('doublebridges')


/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/



/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/


/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

function gitCard(object) {

  const card = document.createElement('div')
  const img = document.createElement('img')
  const cardInfo = document.createElement('div')
  const name = document.createElement('h3')
  const userName = document.createElement('p')
  const location = document.createElement('p')
  const profile = document.createElement('p')
  const profileLink = document.createElement('a')
  const followers = document.createElement('p')
  const following = document.createElement('p')
  const bio = document.createElement('p')

  const cards = document.querySelector('.cards')

  cards.appendChild(card)
  card.appendChild(img)
  card.appendChild(cardInfo)
  cardInfo.appendChild(name)
  cardInfo.appendChild(userName)
  cardInfo.appendChild(location)
  cardInfo.appendChild(profile)
  cardInfo.appendChild(profileLink)
  cardInfo.appendChild(followers)
  cardInfo.appendChild(following)
  cardInfo.appendChild(bio)

  card.setAttribute('class', 'card')
  img.setAttribute('src', object.avatar_url)
  cardInfo.setAttribute('class', 'card-info')
  name.setAttribute('class', 'name')
  userName.setAttribute('class', 'username')
  profileLink.setAttribute('href', object.url)

  name.textContent = object.name
  userName.textContent = object.login
  location.textContent = object.location
  profile.textContent = `Profile: ${name.textContent}'s GitHub Repos`
  profileLink.textContent = object.url
  followers.textContent = `Followers: ${object.followers}`
  following.textContent = `Following: ${object.following}`
  bio.textContent = `Bio: ${object.bio}`


  return card
}

/* List of LS Instructors Github username's:
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
