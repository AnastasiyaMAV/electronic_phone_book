import { makeAutoObservable, runInAction } from 'mobx';

interface IUser {
  email: string;
  name: string;
  username: string;
}

export default class UserStore {
  usersArr = [];
  userOne: IUser | never[] = {
    email: '',
    name: '',
    username: '',
  };

  userName = '';
  userEmail = '';
  userUsername = '';

  userContacts = [];

  loggedIn = Boolean(localStorage.getItem('loggedIn'))
    ? Boolean(localStorage.getItem('loggedIn'))
    : false;
  loading = false;
  errload = false;

  constructor() {
    makeAutoObservable(this);
  }

  getUsers = async () => {
    this.loading = true;
    this.errload = false;

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
          throw new Error('Что-то пошло не так ...');
        }
      })
      .then((response) => {
        runInAction(() => {
          this.usersArr = response;
        });
      })
      .catch((err) => {
        console.log(err);
        this.errload = true;
      })
      .finally(() => {
        this.loading = false;
      });
  };

  handleLogin = async (email: string, username: string) => {
    this.loading = true;

    if (this.usersArr.length === 0) {
      await this.getUsers();
    }

    runInAction(() => {
      this.userOne = this.usersArr.filter(
        (user: { username: string; email: string }) => {
          return user.username === username && user.email === email;
        },
      );
    });

    if (Object.values(this.userOne).length === 1) {
      const LOCAL_USERNAME = localStorage.getItem('username');
      const LOCAL_EMAIL = localStorage.getItem('email');
      const LOCAL_LOGGDIN = Boolean(localStorage.getItem('loggedIn'));
      runInAction(() => {
        if (LOCAL_USERNAME && LOCAL_EMAIL) {
          this.userName = Object.values(this.userOne)[0].name;
          this.userEmail = LOCAL_EMAIL;
          this.userUsername = LOCAL_USERNAME;
          this.loggedIn = LOCAL_LOGGDIN;
        } else {
          this.userName = Object.values(this.userOne)[0].name;
          this.userEmail = Object.values(this.userOne)[0].email;
          this.userUsername = Object.values(this.userOne)[0].username;
          this.loggedIn = true;
          localStorage.setItem(
            'username',
            Object.values(this.userOne)[0].username,
          );
          localStorage.setItem('email', Object.values(this.userOne)[0].email);
          localStorage.setItem('loggedIn', 'true');
        }
        this.getContacts();
      });
    }
    this.loading = false;
  };

  logOut = async () => {
    runInAction(() => {
      this.userName = '';
      this.userEmail = '';
      this.userUsername = '';
      this.loggedIn = false;
      localStorage.removeItem('username');
      localStorage.removeItem('email');
      localStorage.removeItem('loggedIn');
    });
  };

  getContacts = async () => {
    this.loading = true;
    this.errload = false;

    await fetch(`http://localhost:3001/${this.userUsername}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Что-то пошло не так ...');
        }
      })
      .then((response) => {
        runInAction(() => {
          this.userContacts = response;
        });
      })
      .catch((err) => {
        console.log(err);
        this.errload = true;
      })
      .finally(() => {
        runInAction(() => {
          this.loading = false;
        });
      });
  };

  handleEditContact = async (
    key: number,
    name: string,
    email: string,
    tel: string,
  ) => {
    this.loading = true;
    this.errload = false;

    await fetch(`http://localhost:3000/${this.userUsername}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        key,
        name,
        email,
        tel,
      }),
    })
      .then((response) => {
        console.log(response);

        // runInAction(() => {
        //   this.userOneObj = res;
        //   this.usersObj = null;
        //   this.successLoad = successMessage.editUser;
        // });
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
