if(typeof window === 'undefined') {
  // use jsdom inside nodejs
  const jsdom = require('jsdom').jsdom
  module.exports = jsdom().defaultView
} else {
  module.exports = window
}
