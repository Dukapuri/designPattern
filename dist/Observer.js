class Observer {
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
