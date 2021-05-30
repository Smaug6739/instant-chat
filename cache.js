const kMaxSize = Math.pow(2, 24)

const BigMap = class {
  /*
    public api, compatible with "Map"
  */

  constructor (...parameters) {
    this.maps = [new Map(...parameters)]
  }

  set (key, value) {
    const map = this.maps[this.maps.length - 1]

    if (map.size === kMaxSize) {
      this.maps.push(new Map())
      return this.set(key, value)
    } else {
      return map.set(key, value)
    }
  }

  has (key) {
    return _mapForKey(this.maps, key) !== undefined
  }

  get (key) {
    return _valueForKey(this.maps, key)
  }

  delete (key) {
    const map = _mapForKey(this.maps, key)

    if (map !== undefined) {
      return map.delete(key)
    }

    return false
  }

  clear () {
    for (let map of this.maps) {
      map.clear()
    }
  }

  get size () {
    let size = 0

    for (let map of this.maps) {
      size += map.size
    }

    return size
  }

  forEach (callbackFn, thisArg) {
    if (thisArg) {
      for (let value of this) {
        callbackFn.call(thisArg, value)
      }
    } else {
      for (let value of this) {
        callbackFn(value)
      }
    }
  }

  entries () {
    return _iterator(this.maps, 'entries')
  }

  keys () {
    return _iterator(this.maps, 'keys')
  }

  values () {
    return _iterator(this.maps, 'values')
  }

  [Symbol.iterator] () {
    return _iterator(this.maps, Symbol.iterator)
  }
}

/*
  private function
*/

function _mapForKey (maps, key) {
  for (let index = maps.length - 1; index >= 0; index--) {
    const map = maps[index]

    if (map.has(key)) {
      return map
    }
  }
}

function _valueForKey (maps, key) {
  for (let index = maps.length - 1; index >= 0; index--) {
    const map = maps[index]
    const value = map.get(key)

    if (value !== undefined) {
      return value
    }
  }
}

function _iterator (items, name) {
  let index = 0

  var iterator = items[index][name]()

  return {
    next: () => {
      let result = iterator.next()

      if (result.done && index < (items.length - 1)) {
        index++
        iterator = items[index][name]()
        result = iterator.next()
      }

      return result
    },
    [Symbol.iterator]: function () {
      return this
    }
  }
}

BigMap.length = 0

/*
 Big Set
 */

const BigSet = class {
  /*
    public api, compatible with "Set"
  */

  constructor (...parameters) {
    this.sets = [new Set(...parameters)]
  }

  add (key) {
    const set = this.sets[this.sets.length - 1]

    if (set.size === kMaxSize) {
      this.sets.push(new Set())
      return this.add(key)
    } else {
      return set.add(key)
    }
  }

  has (key) {
    return _setForKey(this.sets, key) !== undefined
  }

  delete (key) {
    const set = _setForKey(this.sets, key)

    if (set !== undefined) {
      return set.delete(key)
    }

    return false
  }

  clear () {
    for (let set of this.sets) {
      set.clear()
    }
  }

  get size () {
    let size = 0

    for (let set of this.sets) {
      size += set.size
    }

    return size
  }

  forEach (callbackFn, thisArg) {
    if (thisArg) {
      for (let value of this) {
        callbackFn.call(thisArg, value)
      }
    } else {
      for (let value of this) {
        callbackFn(value)
      }
    }
  }

  entries () {
    return _iterator(this.sets, 'entries')
  }

  keys () {
    return _iterator(this.sets, 'keys')
  }

  values () {
    return _iterator(this.sets, 'values')
  }

  [Symbol.iterator] () {
    return _iterator(this.sets, Symbol.iterator)
  }
}

/*
  private function
*/

function _setForKey (sets, key) {
  for (let index = sets.length - 1; index >= 0; index--) {
    const set = sets[index]

    if (set.has(key)) {
      return set
    }
  }
}

function _iterator (items, name) {
  let index = 0

  var iterator = items[index][name]()

  return {
    next: () => {
      let result = iterator.next()

      if (result.done && index < (items.length - 1)) {
        index++
        iterator = items[index][name]()
        result = iterator.next()
      }

      return result
    },
    [Symbol.iterator]: function () {
      return this
    }
  }
}

BigSet.length = 0