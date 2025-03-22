abstract class Observer {
  abstract subscribe(listener: Listener): void;
  abstract unsubscribe(name: string): void;
  abstract publish(): void;
}

interface Listener {
  name: string;
  publish(event: string): void;
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
