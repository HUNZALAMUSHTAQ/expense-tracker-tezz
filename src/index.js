// const { auth } = require("./firebase")
import { UIControllers } from "./UIController"
import { AccountControllers } from "./AccountController"
import "./app.css"
import { auth } from "./firebase"
import { db } from "./firebase"
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from "@firebase/auth"



class App {

    onSignupSubmit(e) {
        e.preventDefault()
        // console.log(e)
        let username = document.getElementById('signup-name').value
        let email = document.getElementById('signup-email').value
        let password = document.getElementById('signup-password').value
        console.log(username, email)

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)
                localStorage.setItem('userUID', user.uid)
                localStorage.setItem('email', user.email)
                // adding pre default user to firebase 
                let savingAccountPromise = AccountControllers.createNewAccountForUser(user.uid, "Cash", 10000)
                let currentAccountPromise = AccountControllers.createNewAccountForUser(user.uid, "Bank", 5000)

                Promise.all([savingAccountPromise, currentAccountPromise])
                    .then(() => {
                        console.log("Added Account to the firebase ")
                        location.reload()

                    }).catch((e) => {
                        UIControllers.showErrorOnDashboard("Some Error has occurred adding accounts")
                        console.log("Error occurred resolving the promise of setting Saving and Current Account ")
                        location.reload()

                    })
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
        console.log(email)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                localStorage.setItem('userUID', user.uid)
                localStorage.setItem('email', user.email)


                // reloading to reset a;; the states 
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
    plotDoghnutChart(expense, income) {

        var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            title: {
                text: "Overview",
                horizontalAlign: "left"
            },
            data: [{
                type: "doughnut",
                startAngle: 60,
                //innerRadius: 60,
                indexLabelFontSize: 17,
                indexLabel: "{label} - #percent%",
                toolTipContent: "<b>{label}:</b> {y} (#percent%)",
                dataPoints: [
                    { y: parseInt(expense), label: "Expenses" },
                    { y: parseInt(income), label: "Income" }
                ]
            }]
        });
        chart.render();


    }
    async addMoreAccount(e) {

        e.preventDefault()
        let accountTypeEL = document.getElementById('modal-account-name')
        let accountAmountEL = document.getElementById('modal-account-amount')

        let accountType = accountTypeEL.value
        let accountAmount = accountAmountEL.value
        console.log(accountAmount, accountType)

        try {

            let userUID = localStorage.getItem('userUID')
            let newAccountId = await AccountControllers.createNewAccountForUser(localStorage.getItem('userUID'), accountType, parseInt(accountAmount))
            let singleAccountsDataFromFirebase = await AccountControllers.getSingleUserAccountData(userUID, newAccountId)
            console.log(singleAccountsDataFromFirebase)
            UIControllers.appendAccountToList(singleAccountsDataFromFirebase)

        } catch (e) {

            UIControllers.showErrorOnDashboard("Error Occurred Adding An Acount ", e)
            console.log(e)
        }
        accountTypeEL.value = ''
        accountAmountEL.value = ''
        document.getElementById("modal-close-button").click();
    }
    async addTransaction(e) {
        e.preventDefault()
        // Radio Buttons
        let transactionTypeEl = document.getElementsByName("transaction-type")
        let transactionCategoryEl = document.getElementsByName("category")

        let transactionCategory;
        let transactionType;
        for (let i = 0; i < transactionTypeEl.length; i++) {
            if (transactionTypeEl[i].checked) {
                transactionCategory = transactionTypeEl[i].value
            }
        };
        for (let i = 0; i < transactionCategoryEl.length; i++) {
            if (transactionCategoryEl[i].checked) {
                transactionType = transactionCategoryEl[i].value
            }
        }
        if (!transactionCategory || !transactionType) {
            UIControllers.showErrorOnDashboard("Select Some Values bruh")
        }
        console.log(transactionCategory, transactionType)

        // transaction input
        let transactionAmount = document.getElementById("transaction-amount").value
        console.log(transactionAmount)

        // transaction account
        const transactionAccountEL = document.getElementById('transaction-account-select')
        const transactionAccountName = transactionAccountEL.options[transactionAccountEL.selectedIndex].text
        const transactionAccountAmount = transactionAccountEL.value
        const transactionAccountId = transactionAccountEL.options[transactionAccountEL.selectedIndex].id

        console.log(transactionAccountName, transactionAccountAmount, transactionAccountId)

        // Some Validtaions When Account have No Balance
        if (parseInt(transactionAmount) > parseInt(transactionAccountAmount) && transactionCategory == 'expense') {
            UIControllers.showErrorOnDashboard("Insufficient Balance in Account")
        } else {
            let userUID = localStorage.getItem('userUID')

            let actualTransactionAmount = transactionCategory == 'expense' ? -Math.abs(transactionAmount) : Math.abs(transactionAmount)

            console.log(actualTransactionAmount)
            let transactionId = await AccountControllers.createNewTransactionForUser(userUID, transactionAccountName, actualTransactionAmount, transactionType)
            UIControllers.appendTransactionsToList(transactionId, transactionAccountName, actualTransactionAmount, transactionType)
            console.log(transactionId)
        }
    }

    logoutUserDashboard() {
        signOut(auth).then(() => {
            localStorage.removeItem('userUID')
            localStorage.removeItem('email')
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
        document.getElementById('add-account').addEventListener('submit', this.addMoreAccount)
        document.getElementById('add-transactions').addEventListener('submit', this.addTransaction)
    }


    async init() {
        console.log('App initialized ...')
        const userUID = localStorage.getItem('userUID')
        if (userUID) {
            // dashboard section 
            UIControllers.showDashboardPage()
            document.getElementById('dashboard-email').innerText = localStorage.getItem('email')
            let allAccountsDataFromFirebase = await AccountControllers.getAllUserAccountsData(userUID)
            let allTransactionsDataFromFireBase = await AccountControllers.getAllTransactionsData(userUID)
            let chartData = AccountControllers.calculateManyExpenses(allTransactionsDataFromFireBase)

            // console.log(AccountControllers.logData().accounts)
            console.log(allAccountsDataFromFirebase)
            console.log(allTransactionsDataFromFireBase)
            console.log(chartData)

            UIControllers.calculateTotalAccountAmountAddToUI(allAccountsDataFromFirebase)
            UIControllers.populateTransactionsToList(allTransactionsDataFromFireBase)
            AccountControllers.calculateManyExpenses(allTransactionsDataFromFireBase)
            UIControllers.populateAccountsList(allAccountsDataFromFirebase)
            this.plotDoghnutChart(chartData.expenses, chartData.income)
        } else {
            UIControllers.showAuthPage()
        }
        this.loadAuthEventListeners()

    }
}

const app = new App()

app.init()


