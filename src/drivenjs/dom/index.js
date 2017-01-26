const get_window = () => {
  if(typeof window === 'undefined') {
    // use jsdom inside nodejs
    const jsdom = require('jsdom').jsdom
    return jsdom().defaultView
  } else {
    return window
  }
}

module.exports = get_window()
