// const { auth } = require("./firebase")
import { UIControllers } from "./UIController"
import { AccountControllers } from "./AccountController"
import "./app.css"
import auth from "./firebase"
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from "@firebase/auth"



class App {

    onSignupSubmit(e) {
        e.preventDefault()
        // console.log(e)
        let username = document.getElementById('signup-name').value
        let email = document.getElementById('signup-email').value
        let password = document.getElementById('signup-password').value
        console.log(username, email, password)

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)
                localStorage.setItem('userUID', user.uid)
                location.reload()
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
                UIControllers.showErrorOnSignupPage(errorMessage)
            });

    }
    onSubmitLogin(e) {
        e.preventDefault()
        // console.log(e)
        let email = document.getElementById('login-email').value
        let password = document.getElementById('login-password').value
        console.log(email, password)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                localStorage.setItem('userUID', user.uid)
                location.reload()
                console.log(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
                UIControllers.showErrorOnLogin(errorMessage)
            });

    }

    logoutUserDashboard() {
        signOut(auth).then(() => {
            localStorage.removeItem('userUID')
            location.reload()
        }).catch((error) => {
            // An error happened.
            UIControllers.showErrorOnDashboard(error)
        });
    }

    loadAuthEventListeners() {
        const UISelectors = UIControllers.getSelectors()
        console.log(UISelectors, '-----')
        document.getElementById(UISelectors.switchToSignup).addEventListener('click', UIControllers.switchToSignup)
        document.getElementById(UISelectors.swithToLogin).addEventListener('click', UIControllers.switchToLogin)
        document.getElementById('signup-form').addEventListener('submit', this.onSignupSubmit)
        document.getElementById('login-form').addEventListener('submit', this.onSubmitLogin)
        document.getElementById('user-logout').addEventListener('click', this.logoutUserDashboard)

    }


    init() {
        console.log('App initialized ...')
        const userUID = localStorage.getItem('userUID')
        if (userUID) {
            // dashboard section 
            UIControllers.showDashboardPage()

            console.log(AccountControllers.logData().accounts)
            UIControllers.populateAccountsList(AccountControllers.logData().accounts)
        } else {
            UIControllers.showAuthPage()
        }
        this.loadAuthEventListeners()

    }
}

const app = new App()

app.init()

console.log("hello from index.js")
console.log(auth)