const child_process = require('child_process')

module.exports = (fn) => {
  // simple wrapper to pretty tests
  return () => { 
    return new Promise(fn)
  }
}
