import { makeAutoObservable, runInAction } from 'mobx';



export default class UserStore {
  userId = '';
  userName = '';
  userEmail = '';
  userAdmin = false;
  userLang = 'RU';
  usersObj = null;
  userOneObj = null;

  loggedIn = false;
  loading = false;
  errload = '';
  successLoad = '';

  constructor() {
    makeAutoObservable(this);
  }

  getUsers = async () => {
    this.loading = true;
    this.errload = '';

    await fetch(`https://jsonplaceholder.typicode.com/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log(response.json());
        } else {
          throw new Error("Something went wrong ...");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        runInAction(() => {
          this.loading = false;
        });
      });
  };

  // handleLogin = async (email, userName) => {
  //   this.loading = true;
  //   this.errload = '';

  //   await fetch(`https://jsonplaceholder.typicode.com/users`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json;charset=utf-8',
  //     },
  //     // body: JSON.stringify(word),
  //   })
  //     .then((res) => {
  //       runInAction(() => {
  //         this.handleGetUserInfo(email, userName);
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //     .finally(() => {
  //       runInAction(() => {
  //         this.loading = false;
  //       });
  //     });
  // };

  // logOut = async () => {
  //   localStorage.removeItem('token');

  //   runInAction(() => {
  //     this.userName = '';
  //     this.userEmail = '';
  //     this.userAdmin = false;
  //     this.loggedIn = false;
  //     this.usersObj = null;
  //   });
  // };

  // handleGetUserInfo = async (token) => {
  //   await getUserInfo(token)
  //     .then((res) => {
  //       localStorage.setItem('lang', res.lang);

  //       runInAction(() => {
  //         this.userId = res._id;
  //         this.userName = res.name;
  //         this.userEmail = res.email;
  //         this.userAdmin = res.admin;
  //         this.userLang = res.lang;
  //         this.loggedIn = true;
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // setErrload = () => {
  //   runInAction(() => {
  //     this.errload = '';
  //   });
  // };

  // setSuccessLoad = () => {
  //   runInAction(() => {
  //     this.successLoad = '';
  //   });
  // };
}
