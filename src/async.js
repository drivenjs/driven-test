const exceptions = require('./exceptions')
const child_process = require('child_process')


const async = (fn, timeout=1000) => {
  // simple wrapper to pretty tests
  return () => { 
    return new Promise((resolve, reject) => {
      fn(resolve, reject)

      // Add timeout to prevent unresolved promises
      setTimeout(() => {
        const err = new exceptions.TimeOutError("Keep out")
        reject(err)
      }, timeout)
    })
  }
}


module.exports = async
