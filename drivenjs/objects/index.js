class Observer {
  constructor() {
    this._listeners = []
  }

  addListener(listenerFn, fields=[]) {
    this._listeners.push({
      fn: listenerFn,
      fields: fields,
      all: fields.length === 0
    })
  }

  removeListener(listenerFn) {
    this._listeners = this._listeners.filter((listener) => {
      return listener.fn !== listenerFn
    })
  }

  change(field, currentValue, previousValue) {
    this._listeners.forEach((listener) => {
      if (listener.all) {
        listener.fn()
      } else if (listener.fields.includes(field)) {
        listener.fn(currentValue, previousValue, key)
      }
    })
  }
}


class DrivenObject {
  constructor(data) {
    this._model = {}
    this._observer = new Observer()
    this.update(data || {})
  }

  /**
   * Update many elements at the same time
   */
  update(data) {
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        this.set(key, data[key])
      }
    }
  }

  /**
   * Get an element of the Object
   */
  get(key) { 
    return this._model[key] 
  }

  /**
   * Set an value to an ekement of the Object
   */
  set(key, value) {
    const previous = this.get(key)

    if (value === Object(value)) {
      value = new DrivenObject(value)
    }

    this._model[key] = value
    this._observer.change(value, previous)

    return value
  }

  /**
   * Observe if anywere change the object
   */
  observe(fn) {
    this._observer.addListener(fn)
  }

  /**
   * Remove an observer
   */
  unObserve(fn) {
    this._observer.removeListener(fn)
  }

}

module.exports = {
  DrivenObject: DrivenObject
}
