import UserStore from './UserStore';

class RootStore {
  constructor() {
  }

  UserStore = new UserStore();
}

const store = new RootStore();

export default store;


// import { useContext, createContext } from "react";
// import UserStore from './UserStore';

// export const rootStoreContext = createContext({
//   UserStore: new UserStore()
// });

// export const useStores = () => useContext(rootStoreContext);