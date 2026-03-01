export function createStore(rootReducer, initialState = {}) {
  const state = rootReducer({...initialState}, {type: '_INIT_'});
  let listeners = [];

  return {
    subscribe(fn) {
      listeners.push(fn);
      return {
        unsubscribe() {
          listeners = listeners.filter(l => l !== fn);
        }
      }
    },
    dispatch(action) {
      rootReducer(state, action);
      listeners.forEach(listener => listener(state));
    },
    getState() {
      return state;
    },
  }
}