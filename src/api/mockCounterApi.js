import delay from './delay'

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
let counter = 0
let timer = 0
let clearTimer = function () {
  clearTimeout(timer)
}

class CounterApi {
  static getCounter () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(counter)
      }, delay)
    })
  }

  static saveCounter (cntr) {
    return new Promise((resolve, reject) => {
      clearTimer()
      timer = setTimeout(() => {
        // Simulate server-side validation
        const requiredType = 'number'
        if (typeof cntr !== requiredType) {
          reject('Counter must be a Number')
        }

        counter = cntr

        resolve(counter)
      }, delay)
    })
  }
}

export default CounterApi
