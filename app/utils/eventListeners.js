/**
 * Utility functions for managing event listeners with automatic cleanup
 */

export const createEventListenerManager = () => {
  const listeners = [];
  const timeouts = [];
  const cleanupCallbacks = [];

  const registerListener = (target, event, handler, options) => {
    if (!target || typeof target.addEventListener !== 'function') return;
    target.addEventListener(event, handler, options);
    listeners.push(() => {
      target.removeEventListener(event, handler, options);
    });
  };

  const registerTimeout = (id) => {
    timeouts.push(id);
  };

  const registerCleanup = (callback) => {
    cleanupCallbacks.push(callback);
  };

  const cleanup = () => {
    listeners.forEach((off) => off());
    timeouts.forEach((id) => window.clearTimeout(id));
    cleanupCallbacks.forEach((callback) => callback());
  };

  return {
    registerListener,
    registerTimeout,
    registerCleanup,
    cleanup
  };
};



