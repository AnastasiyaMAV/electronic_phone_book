import { makeAutoObservable, runInAction } from 'mobx';

interface IUser {
  email: string;
  name: string;
  username: string;
}

export default class UserStore {
  usersMass = [];
  userOne: IUser | never[] = {
    email: '',
    name: '',
    username: '',
  };

  userName = '';
  userEmail = '';
  userUsername = '';

  contactsUserMass = [];

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
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then((response) => {
        runInAction(() => {
          this.usersMass = response;
        });
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

  handleLogin = async (email: string, username: string) => {
    this.loading = true;
    this.errload = '';
    runInAction(() => {
      this.userOne = this.usersMass.filter(
        (user: { username: string; email: string }) => {
          return user.username === username && user.email === email;
        },
      );
    });

    if (Object.values(this.userOne).length === 1) {
      this.loggedIn = true;
      runInAction(() => {
        this.userName = Object.values(this.userOne)[0].name;
        this.userEmail = Object.values(this.userOne)[0].email;
        this.userUsername = Object.values(this.userOne)[0].username;
        this.loggedIn = true;
      });
    }
  };

  logOut = async () => {
    runInAction(() => {
      this.userName ='';
      this.userEmail = '';
      this.userUsername = '';
      this.loggedIn = false;
    });
  };

  getContacts = async () => {
    this.loading = true;
    this.errload = '';

    await fetch(`http://localhost:3000/${this.userUsername}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then((response) => {
        runInAction(() => {
          this.contactsUserMass = response;
        });
        console.log(response);
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
