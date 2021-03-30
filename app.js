// ----
// DATA
// ----

// A couple jokes to start with
let jokes = {
  'the horse': {
    setup: 'A horse walks into the bar. The bartender asks...',
    punchline: 'Why the long face?'
  },
  'Orion\'s pants': {
    setup: 'How does Orion keep his pants up?',
    punchline: 'With an asteroid belt.'
  }
}

// The message to display if the jokes object is empty
const noJokesMessage = 'I... I don\'t know any jokes. 😢'
let stringifiedJokes = ''
// -------------
// PAGE UPDATERS
// -------------

// Update the listed jokes, based on the jokes object
const jokesMenuList = document.getElementById('jokes-menu')
const updateJokesMenu = function () {
  // Don't worry too much about this code for now.
  // You'll learn how to do advanced stuff like
  // this in a later lesson.
  const jokeKeys = Object.keys(jokes)
  const jokeKeyListItems = jokeKeys.join('</li><li>') || noJokesMessage
  jokesMenuList.innerHTML = '<li>' + jokeKeyListItems + '</li>'
}

// Update the displayed joke, based on the requested joke
const requestedJokeInput = document.getElementById('requested-joke')
const jokeBox = document.getElementById('joke-box')
const updateDisplayedJoke = function () {
  const requestedJokeKey = requestedJokeInput.value
  if ((Object.keys(jokes)).indexOf(requestedJokeKey) > -1) {
    jokeBox.innerHTML = '<p>' + jokes[requestedJokeKey].setup + '</p> <p>' + jokes[requestedJokeKey].punchline + '</p>'
  } else {
    jokeBox.innerHTML = '<p>No matching jokes found.</p>'
  }
}

const addButton = document.getElementById('remember-button')
const jokeLabelInput = document.getElementById('label-input')
const jokeSetupInput = document.getElementById('setup-input')
const jokePunchlineInput = document.getElementById('punchline-input')
const addJoke = function () {
  jokes[jokeLabelInput.value] = {
    setup: jokeSetupInput.value,
    punchline: jokePunchlineInput.value
  }
  updateJokesMenu()
  jokeLabelInput.value = ''
  jokeSetupInput.value = ''
  jokePunchlineInput.value = ''
  stringifiedJokes = JSON.stringify(jokes)
  window.localStorage.setItem('jokes', stringifiedJokes)
}

// Delete Joke Button

const deleteButton = document.getElementById('forget-button')
const deleteInput = document.getElementById('delete-input')

const deleteJoke = function () {
  const toRemove = deleteInput.value
  delete jokes[toRemove]
  updateJokesMenu()
  deleteInput.value = ''
  stringifiedJokes = JSON.stringify(jokes)
  window.localStorage.setItem('jokes', stringifiedJokes)
}

// Function to keep track of all other
// page update functions, so that we
// can call them all at once
const updatePage = function () {
  updateJokesMenu()
  updateDisplayedJoke()
}

// -------
// STARTUP
// -------

// Update the page immediately on startup
const localJokes = window.localStorage.getItem('jokes')
if (localJokes !== null) {
  jokes = JSON.parse(localJokes)
}
updatePage()
// ---------------
// EVENT LISTENERS
// ---------------

// Keep the requested joke up-to-date
requestedJokeInput.addEventListener('input', updateDisplayedJoke)
addButton.addEventListener('click', addJoke)
deleteButton.addEventListener('click', deleteJoke)
