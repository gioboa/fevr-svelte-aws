import { writable, get } from 'svelte/store';
import Auth from '@aws-amplify/auth';

export const MODE = Object.freeze({
  SIGN_IN: 0,
  SIGN_UP: 1,
  CONFIRM: 2,
  LOGGED: 3,
});

const myStore = () => {
  const getNewId = () => new Date().getTime();
  const DEFAULT = {
    username: '',
    items: [
      { id: getNewId(), name: 'Giorgio Boa', title: 'Developer' },
      { id: getNewId() + 1, name: 'John Doe', title: 'Manager' },
      { id: getNewId() + 2, name: 'Mario Bros.', title: 'Idraulico' },
    ],
    mode: MODE.SIGN_IN,
  };
  const store = writable(DEFAULT);
  const { subscribe, set } = store;

  return {
    subscribe,
    goToSignIn: () => set({ ...get(store), mode: MODE.SIGN_IN }),
    goToSignUp: () => set({ ...get(store), mode: MODE.SIGN_UP }),
    signIn: ({ username, password }) =>
      Auth.signIn(username, password).then((data) => {
        set({ ...get(store), username, mode: MODE.LOGGED });
      }),
    signUp: ({ username, password, email }) =>
      Auth.signUp({ username, password, attributes: { email } }).then(
        set({ ...get(store), username, mode: MODE.CONFIRM })
      ),
    confirm: (confirmCode) => {
      Auth.confirmSignUp(get(store).username, confirmCode).then((data) => {
        console.log('confirmCode: ', confirmCode);
        set({ ...get(store), mode: MODE.LOGGED });
      });
    },
    add: (name, title) =>
      set({
        ...get(store),
        items: [{ id: getNewId(), name, title }, ...get(store).items],
      }),
    delete: (id) =>
      set({
        ...get(store),
        items: get(store).items.filter((item) => item.id !== id),
      }),
  };
};

const store = myStore();
export default store;
