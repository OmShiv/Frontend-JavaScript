// All Settled

if (!Promise.allSettled) {
  const resolver = value => ({ status: 'fulfilled', value });
  const rejector = reason => ({ status: 'rejected', reason });

  Promise.allSettled = function(promises) {
    const resolvedPromises = promises.forEach(promise => Promise.resolve(promise).then(resolver, rejector));
    return new Promise.all(resolvedPromises);
  }
}

// Sequential promises

const executeInSequence = promises => {
  return promises.reduce((finalPromise, promise) => {
    return finalPromise.then(finalResult => {
      return promise.then(result => {
        finalResult.push(result);
        return finalResult;
      })
    })
  }, Promise.resolve([]));
}

function recursiveExecuteInSequence(promises, results = []) {
  const [firstPromise, ...restPromises] = promises;
  return firstPromise.then(result => {
    results.push(result);
    return recursiveExecuteInSequence(restPromises, results);
  })
}

// Clone Objects

function deepClone(data, store = []) {
  if (data === null || typeof data !== 'object') {
    return data;
  }

  const clone = Array.isArray(data) ? [] : {};

  const existingItem = store.find(item => data === item.original);
  if (existingItem) return existingItem.clone;

  store.push({ original: data, clone });

  for (key in data) {
    if (data.hasOwnProperty(key)) {
      clone[key] = deepClone(data[key]);
    }
  }

  return clone;
}

// Memoize a function

function memoizeFunction(fn) {
  const cache = new Map();

  return function(...args) {
    const cacheKey = JSON.stringify(args);
    if (cache.has(cacheKey)) return cache.get(cacheKey);

    const returnedValue = fn.apply(this, args);
    cache.set(cacheKey, returnedValue);
    return returnedValue;
  }
}

/**
 * Promisify a function Original callback-style function
 */

function readFile(path, callback) {
  setTimeout(() => {
    if (path === 'bad.txt') {
      callback(new Error('File not found'));
    } else {
      callback(null, 'File contents here');
    }
  }, 100);
}

// Convert to promise-style
const readFileAsync = promisify(readFile);

// Usage
readFileAsync('good.txt').then(console.log).catch(console.error);
// -> 'File contents here'

readFileAsync('bad.txt').then(console.log).catch(console.error);
// -> Error: File not found

function promisify(fn) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      const callback = (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result);
        }
      }

      args.push(callback);
      fn.apply(this, args);
    });
  }
}

class PubSub {
  constructor() {
    this.events = {}
  }

  subscribe(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    let subscriptions = this.events[event];
    subscriptions.push(callback);

    return {
      unsubscribe: () => {
        subscriptions = subscriptions.filter(cb => cb !== callback);
      }
    }
  }

  publish(event, data) {
    this.events[event].forEach(cb => cb(data));
  }
}
