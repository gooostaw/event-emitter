class EventListener {
    /**
     * @param {EventEmitter} eventEmitter
     * @param {string} eventName
     * @param {Function} listenerFn
     */
    constructor(eventEmitter, eventName, listenerFn) {
        this.eventEmitter = eventEmitter;
        this.eventName = eventName;
        this.fn = listenerFn;
        this.isOn = true;

        let listeners = eventEmitter.getListenersSet(eventName);
        listeners.add(this);
    }

    emit(...args) {
        if (this.isOn)
            this.fn(...args);
    }

    on() {
        this.isOn = true;
    }

    off() {
        this.isOn = false;
    }

    remove() {
        let listeners = this.eventEmitter.getListenersSet(this.eventName);
        listeners.delete(this);

        this.eventEmitter = null;
        this.eventName = null;
        this.fn = null;
    }
}

class EventEmitter {
    constructor() {
        /**@type {Map<String, Set<EventListener>>}*/
        this.events = new Map();
    };

    /**
     * @param {string} name
     * @return {Set<EventListener>}
     */
    getListenersSet(name) {
        if (!this.events.has(name))
            this.events.set(name, new Set);

        return this.events.get(name);
    }

    on(eventName, listenerFn) {
        return new EventListener(this, eventName, listenerFn);
    }

    off(eventName, listenerFn) {
        if (eventName === undefined) {
            for (let [eventName, listeners] of this.events)
                for (let listener of listeners)
                    listener.remove();
            return;
        }

        if (listenerFn) {
            for (let listener of this.getListenersSet(eventName))
                if (listenerFn === listener.fn)
                    listener.remove();
        }
        else {
            for (let listener of this.getListenersSet(eventName))
                listener.remove();
        }
    }

    emit(eventName, ...args) {
        for (let listener of this.getListenersSet(eventName))
            listener.emit(...args);
    }

    clear() {
        for (let [name, listenersSet] of this.events)
            for (let listener of listenersSet)
                listener.remove();
    }
}

module.exports = EventEmitter;