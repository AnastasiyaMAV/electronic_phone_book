import UserStore from './UserStore';

class RootStore {
  constructor() {
  }

  UserStore = new UserStore();
}

const store = new RootStore();

export default store;
