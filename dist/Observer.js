class Observer {
}
export class SubscriptionManager {
    listeners = {};
    static instance;
    constructor() { }
    addEvent(event) {
        if (this.listeners[event]) {
            return;
        }
        this.listeners[event] = [];
    }
    subscribe(event, listener) {
        this.listeners[event].push(listener);
    }
    unsubscribe(event, name) {
        this.listeners[event] = this.listeners[event].filter((listener) => listener.name !== name);
    }
    publish(name) {
        this.listeners[name].forEach((listener) => {
            listener.publish(name);
        });
    }
    static getInstance() {
        if (!SubscriptionManager.instance) {
            SubscriptionManager.instance = new SubscriptionManager();
        }
        return SubscriptionManager.instance;
    }
}
export class SaveCompleteObserver extends Observer {
    listeners = [];
    publish() {
        this.listeners.forEach((listener) => {
            listener.publish("saveComplete");
        });
    }
    subscribe(listener) {
        this.listeners.push(listener);
    }
    unsubscribe(name) {
        this.listeners = this.listeners.filter((listener) => listener.name !== name);
    }
}
