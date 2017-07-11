var preference
var ipc = require('electron').ipcRenderer

var defaultPreference = {
  'open-window-shortcut': 'ctrl+alt+z',
  'emoji-size': '15',
  'open-at-login': false
}

var preferenceNames = {
  'open-window-shortcut': 'Mojibar shortcut',
  'emoji-size': 'Emoji font size',
  'open-at-login': true
}

var applyPreferences = function (preference, initialization) {
  window.localStorage.setItem('preference', JSON.stringify(preference))

  ipc.send('update-preference', preference, initialization)
  var style = document.createElement('style')
  style.innerText = '.emoji { font-size: ' + preference['emoji-size'] + 'px; width: 100%'  + 'px; height: ' + (Number(preference['emoji-size']) + 20) + 'px; ' +
    '  font-family: "AppleColorEmoji", "Noto Color Emoji", "EmojiOne Color", sans-serif;   -webkit-appearance: none; background: transparent; border: 0;  overflow: hidden;  text-overflow: ellipsis;white-space: nowrap;}'
  document.body.appendChild(style)
}

var savePreference = function (event) {
  event.preventDefault()

  Object.keys(preference).forEach(function (key) {
    var el = document.getElementById(key)
    preference[key] = el.type === 'checkbox' ? el.checked : el.value
  })

  applyPreferences(preference)
}

if (window.localStorage.getItem('preference')) {
  preference = JSON.parse(window.localStorage.getItem('preference'))
  Object.keys(defaultPreference).forEach(function (key) {
    if (!preference[key]) preference[key] = defaultPreference[key]
  })
} else {
  preference = defaultPreference
}

applyPreferences(defaultPreference, true) //default