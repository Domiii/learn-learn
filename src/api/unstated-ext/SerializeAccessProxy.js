import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';


class SerializeAccessState {
  constructor(root) {
    this.root = root;
    this.current = root;
    this.chain = [];
  }
}

export default function makeProxy(target, state) {
  state = state || new SerializeAccessState(target);

  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
  const p = new Proxy(target, {
    has(target, prop) {
      return !!state.current[prop];
    },

    get(target, prop) {
      switch (prop) {
        case '__result':
          return state.current;
        case '__serialized':
          return state.chain.map(s => isString(s) ? s : JSON.stringify(s)).join('');
      }

      if (this.has(target, prop)) {
        const val = state.current[prop];
        state.chain.push(prop);

        if (isFunction(val)) {
          return (...args) => {
            state.chain.push(args);

            const res = state.current[prop](...args);
            state.current = res;
            return p;
          };
        }
        else {
          state.current = val;
          return p;
        }
      }
    }
  });
  return p;
};