/**
 * 
    const emitter = new Emitter();
    // 1. Support subscribing to events.
    const sub = emitter.subscribe('event_name', callback);
    // 2. Support emitting events.
    // This particular example should lead to the callback above being invoked with foo and bar as parameters.
    emitter.emit('event_name', 'foo', 'bar');
    // 3. Support unsubscribing existing subscriptions by releasing them.
    // sub.release(); // sub is the reference returned by subscribe above
 */

class Emitter {
  constructor() {
    this.events = {};
  }

  subscribe(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    
    this.events[eventName].push(callback);

    this.release = () => {
      this.events[eventName] = this.events[eventName].filter(cb => cb !== callback);
      if (this.events[eventName].length === 0) {
        delete this.events[eventName];
      }
    };
    
    return this;
  }

  emit(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(callback => callback(...args));
    }
  }
}

// Example usage
const emitter = new Emitter();
const sub = emitter.subscribe('event_name', (foo, bar) => {
  console.log(`Received: ${foo}, ${bar}`);
});

emitter.emit('event_name', 'foo', 'bar'); // Logs: "Received: foo, bar"

sub.release();

emitter.emit('event_name', 'foo', 'bar'); // No logs, since subscription is released
