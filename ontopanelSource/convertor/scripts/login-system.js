import OntoTree from "./onto-tree.js";
import { storeData } from "./store.js";
import OntoButton from "./onto-button";
import loginSystem from "../html/login-system.html";

class SignForm {
  constructor(app) {
    this.app = app;
    this.init();
  }
  init = () => {
    let loginSystemHtml = document.createElement("div");
    loginSystemHtml.innerHTML = loginSystem;
    this.app.appendChild(loginSystemHtml);

    // close box and reset forms

    let closeBox = loginSystemHtml.querySelectorAll(".box-close-span");
    closeBox.forEach((elem) => {
      elem.onclick = () => {
        let parent = elem.parentNode.parentNode;
        parent.style.display = "none";
        let forms = parent.querySelectorAll("form");
        forms.forEach((form) => {
          form.querySelector(".box-info").innerText = "";
          form.reset();
        });
      };
    });

    this.signLoginBox = loginSystemHtml.querySelector("#ontopanel-sign-box");
    this.signLoginBox.style.display = "none";

    this.resetPasswordBox = loginSystemHtml.querySelector(
      "#ontopanel-reset-password-box"
    );

    this.resetPasswordBox.style.display = "none";

    // login box
    // automatically login in
    let loginUser = localStorage.getItem("loginUser");
    if (loginUser) {
      loginUser = JSON.parse(loginUser);
      this.downloadOnto(loginUser.token, loginUser.email);
    }
  };

  signUp = () => {
    this.signLoginBox.style.display = "block";
    let signUpForm = this.signLoginBox.querySelector("#ontopanel-signup-form");
    let loginForm = this.signLoginBox.querySelector("#ontopanel-login-form");

    signUpForm.style.display = "block";
    loginForm.style.display = "none";

    signUpForm.querySelector(".box-info").innerText = "";
    signUpForm.reset();

    signUpForm.onsubmit = (evt) => {
      evt.preventDefault();
      let formData = new FormData(evt.target);
      this.validateSignUp(formData);
    };

    let linkLogin = signUpForm.querySelector("a");

    linkLogin.onclick = (evt) => {
      evt.preventDefault();
      this.login();
    };
  };

  login = () => {
    this.signLoginBox.style.display = "block";
    let signUpForm = this.signLoginBox.querySelector("#ontopanel-signup-form");
    let loginForm = this.signLoginBox.querySelector("#ontopanel-login-form");
    signUpForm.style.display = "none";
    loginForm.style.display = "block";

    loginForm.querySelector(".box-info").innerText = "";
    loginForm.reset();

    loginForm.onsubmit = (evt) => {
      evt.preventDefault();
      let formData = new FormData(evt.target);
      this.validateLogin(formData);
    };

    // links

    let linkSignUp = loginForm.querySelector("#ontopanel-sign-link");

    linkSignUp.onclick = (evt) => {
      evt.preventDefault();
      this.signUp();
    };

    let linkResetPassword = loginForm.querySelector(
      "#ontopanel-reset-password-link"
    );

    linkResetPassword.onclick = (evt) => {
      evt.preventDefault();
      this.resetPasswordBox.style.display = "block";
      this.resetPassword();
    };
  };

  logout = () => {
    this.handleLogout();
    if (localStorage.getItem("loginUser")) {
      let token = JSON.parse(localStorage.getItem("loginUser")).token;
      localStorage.removeItem("loginUser");
      fetch("https://ontopanel.herokuapp.com/api/v1/user/logout/", {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        }),
      });
    }
  };

  resetPassword = () => {
    this.resetPasswordBox.style.display = "block";
    let resetPasswordForm = this.resetPasswordBox.querySelector(
      "#ontopanel-reset-password-form"
    );
    let resetPasswordConfirmForm = this.resetPasswordBox.querySelector(
      "#ontopanel-reset-password-confirm-form"
    );
    resetPasswordForm.onsubmit = (evt) => {
      evt.preventDefault();
      let formData = new FormData(evt.target);
      this.resetPasswordToggle(formData);
    };
    resetPasswordConfirmForm.onsubmit = (evt) => {
      evt.preventDefault();
      let formData = new FormData(evt.target);
      this.resetPasswordConfirmToggle(formData);
    };
  };

  validateSignUp = (formData) => {
    let email = formData.get("signEmail").trim();
    let password = formData.get("signPsw").trim();
    let passwordRepeat = formData.get("signPsw-repeat").trim();

    let signUpForm = this.signLoginBox.querySelector("#ontopanel-signup-form");

    let signLoginError = signUpForm.querySelector(".box-info");

    if (passwordRepeat !== password) {
      this.handleFormInfo(signLoginError, "Passwords are not equal.");
    } else {
      let postData = { email: email, password: password };
      fetch("https://ontopanel.herokuapp.com/api/v1/user/register/", {
        method: "POST",
        body: JSON.stringify(postData),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      })
        .then((response) => {
          if (response.ok) {
            this.handleFormInfo(
              signLoginError,
              "Sign Up successfully. Please login in.",
              "green"
            );
            setTimeout(() => {
              this.login();
              signUpForm.reset();
            }, 3000);
          } else {
            response.json().then((text) => {
              let error = Object.keys(text)[0];
              this.handleFormInfo(signLoginError, text[error]);
            });
          }
        })
        .catch((error) => {
          this.handleFormInfo(signLoginError, error);
        });
    }
  };

  validateLogin = (formData) => {
    let loginForm = this.signLoginBox.querySelector("#ontopanel-login-form");
    let signLoginError = loginForm.querySelector(".box-info");

    let email = formData.get("loginEmail").trim();
    let password = formData.get("loginPsw").trim();

    let postData = { username: email, password: password };

    fetch("https://ontopanel.herokuapp.com/api/v1/user/login/", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((userInfo) => {
            localStorage.setItem("loginUser", JSON.stringify(userInfo));
            this.resetAll();
            this.downloadOnto(userInfo.token, userInfo.email);
            this.handleFormInfo(signLoginError, "Login successfully.", "green");
            setTimeout(() => {
              loginForm.reset();
              this.signLoginBox.style.display = "none";
            }, 1000);
          });
        } else {
          response.json().then((text) => {
            let error = Object.keys(text)[0];
            this.handleFormInfo(signLoginError, text[error]);
          });
        }
      })
      .catch((error) => {
        this.handleFormInfo(signLoginError, error);
      });
  };

  downloadOnto = (token, email) => {
    let panelInfo = this.app.querySelector("#ontopanel-sign-info");

    fetch("https://ontopanel.herokuapp.com/api/v1/ontos/lists/", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((text) => {
            text.forEach((elem) => {
              let addBtn = new OntoButton(this.app, elem);
              this.app
                .querySelector("#ontopanel-onto-extra-btn")
                .prepend(addBtn.btn);
            });
            panelInfo.innerText = `Current user: ${email}`;
            this.isLoggedIn(true);
          });
        } else {
          response.json().then((text) => {
            panelInfo.innerText = "Please login again";
            this.isLoggedIn(false);
          });
        }
      })
      .catch((error) => {
        panelInfo.innerText = "Please login again";
        this.isLoggedIn(false);
      });
  };

  resetPasswordToggle = (data) => {
    let email = data.get("resetEmail").trim();
    var resetPasswordInfo = this.resetPasswordBox.querySelector(
      "#ontopanel-reset-password-form .box-info"
    );

    fetch("https://ontopanel.herokuapp.com/api/v1/user/reset_password/", {
      method: "POST",
      body: JSON.stringify({ email: email }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((text) => {
            let info = Object.keys(text)[0];
            this.handleFormInfo(resetPasswordInfo, text[info], "green");
          });
        } else {
          response.json().then((text) => {
            let error = Object.keys(text)[0];
            this.handleFormInfo(resetPasswordInfo, text[error]);
          });
        }
      })
      .catch((error) => {
        this.handleFormInfo(resetPasswordInfo, error);
      });
  };

  resetPasswordConfirmToggle = (data) => {
    let secretKey = data.get("secretKey").trim();
    let newPassword = data.get("resetPsw").trim();
    let conNewPassword = data.get("resetPsw-con").trim();

    let resetPasswordConfirmInfo = this.resetPasswordBox.querySelector(
      "#ontopanel-reset-password-confirm-form .box-info"
    );

    if (newPassword !== conNewPassword) {
      this.handleFormInfo(resetPasswordConfirmInfo, "Passwords are not equal!");
    } else {
      fetch(
        "https://ontopanel.herokuapp.com/api/v1/user/reset_password_confirm/",
        {
          method: "PATCH",
          body: JSON.stringify({
            secret_key: secretKey,
            password: newPassword,
          }),
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        }
      )
        .then((response) => {
          if (response.ok) {
            response.json().then((text) => {
              let info = Object.keys(text)[0];
              this.handleFormInfo(
                resetPasswordConfirmInfo,
                text[info],
                "green"
              );
              setTimeout(() => {
                this.login();
              }, 3000);
            });
          } else {
            response.json().then((text) => {
              let info = Object.keys(text)[0];
              this.handleFormInfo(resetPasswordConfirmInfo, text[info]);
            });
          }
        })
        .catch((error) => {
          this.handleFormInfo(resetPasswordConfirmInfo, error);
        });
    }
  };

  resetAll = () => {
    this.app.querySelector("#ontopanel-onto-extra-btn").innerText = "";
    this.app.querySelector("#ontopanel-sign-info").innerText = "";
    storeData.modifyOntoBank([], "reset");
    storeData.loadCurrentTable(null, "reset");
  };

  handleLogout = () => {
    this.isLoggedIn(false);
    this.resetAll();
  };

  isLoggedIn = (value) => {
    let loginBtn = this.app.querySelector("#ontopanel-login-btn");
    let logoutBtn = this.app.querySelector("#ontopanel-logout-btn");
    logoutBtn.style.display = value ? "block" : "none";
    loginBtn.style.display = value ? "none" : "block";
  };

  handleFormInfo = (elem, input, color = "red") => {
    elem.style.color = color;
    elem.textContent = input;
  };
}

export default SignForm;
