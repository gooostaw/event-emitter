"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EventListener {
    constructor(eventEmitter, eventName, listenerFunc) {
        this.eventEmitter = eventEmitter;
        this.eventName = eventName;
        this.func = listenerFunc;
        this.isOn = true;
        let listeners = eventEmitter.getListenersSet(eventName);
        if (listeners)
            listeners.add(this);
    }
    emit(...args) {
        if (this.isOn)
            this.func(...args);
    }
    on() {
        this.isOn = true;
    }
    off() {
        this.isOn = false;
    }
    remove() {
        let listeners = this.eventEmitter.getListenersSet(this.eventName);
        if (listeners)
            listeners.delete(this);
    }
}
class EventEmitter {
    constructor() {
        this.events = new Map();
    }
    ;
    getListenersSet(name) {
        let listenerSet = this.events.get(name);
        if (listenerSet)
            return listenerSet;
        listenerSet = new Set;
        this.events.set(name, listenerSet);
        return listenerSet;
    }
    on(eventName, listenerFn) {
        return new EventListener(this, eventName, listenerFn);
    }
    off(eventName, listenerFn) {
        if (listenerFn) {
            for (let listener of this.getListenersSet(eventName))
                if (listenerFn === listener.func)
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
exports.default = EventEmitter;
