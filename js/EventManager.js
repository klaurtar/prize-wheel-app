const EventManager = (function () {
  const subscribers = {};

  const subscribe = (eventName, handler) => {
    if (!subscribers[eventName]) {
      subscribers[eventName] = [];
    }
    subscribers[eventName].push(handler);
  };

  const publish = (eventName, data) => {
    if (subscribers[eventName]) {
      subscribers[eventName].forEach((handle) => handle(data));
    }
  };

  const unsubscribe = (eventName, handler) => {
    const handlers = subscribers[eventName];

    if (handlers !== false) {
      const handlerIndex = handlers.indexOf(handler);
      handlers.splice(handlerIndex);
    }
  };

  return {
    subscribe,
    publish,
    unsubscribe,
  };
})();
