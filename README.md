# event-emitter

Event-emitter is an easy-to-use ES module for web browsers. The library allows you to create event emitters and listeners. Listeners can be switched on and off.

# Install
```
$ npm install --save @gooostaw/event-emitter
```

# Usage

Import:
```javascript
import EventEmitter from 'event-emitter.js';
```

Create EventEmitter:
```javascript
let ee = new EventEmitter();
```

or create new class and extend EventEmitter:
```javascript
class Foo extend EventEmitter(){
    //class definition
}

let foo = new Foo();
```

Create listener and emit events:
```javascript
//execute on every emit of 'some-event' event
ee.on('some-event', () => console.log('some-event'));
ee.emit('some-event');
ee.emit('some-event');
```
One-time listener:
```javascript
//execute only once
ee.one('some-event', () => console.log('some-event'));
ee.emit('some-event');
ee.emit('some-event');
```
Sending arguments:
```javascript
//receive an argument from emitter
ee.on('some-event', (argument) => console.log(argument));
ee.emit('some-event', 'abc');

//receive multiple arguments
ee.on('other-event', (arg1, arg2) => console.log(arg1 + arg2));
ee.emit('other-event', 'def', 'ghi');
```
Listeners can be switched on and off:
```javascript
let listener = ee.on('some-event', () => console.log('some-event'));
ee.emit('some-event');
listener.off();
ee.emit('some-event'); //this emit will be ignored
listener.on();
ee.emit('some-event');
```
Remove listeners:
```javascript
listener.remove(); //remove this listener
ee.clear(); //remove all listeners from this emitter
```

## License

[MIT License](https://opensource.org/licenses/MIT) ©