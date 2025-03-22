abstract class Observer {
  abstract subscribe(listener: Listener): void;
  abstract unsubscribe(name: string): void;
  abstract publish(): void;
}

interface Listener {
  name: string;
  publish(event: string): void;
}

export class SubscriptionManager {
  listeners: {
    [key: string]: Listener[];
  } = {};
  private static instance: SubscriptionManager;
  private constructor() {}

  addEvent(event: string) {
    if (this.listeners[event]) {
      return;
    }
    this.listeners[event] = [];
  }

  subscribe(event: string, listener: Listener) {
    this.listeners[event].push(listener);
  }

  unsubscribe(event: string, name: string) {
    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener.name !== name
    );
  }

  publish(name: string) {
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
  listeners: Listener[] = [];

  override publish(): void {
    this.listeners.forEach((listener) => {
      listener.publish("saveComplete");
    });
  }

  override subscribe(listener: Listener) {
    this.listeners.push(listener);
  }

  override unsubscribe(name: string) {
    this.listeners = this.listeners.filter(
      (listener) => listener.name !== name
    );
  }
}
