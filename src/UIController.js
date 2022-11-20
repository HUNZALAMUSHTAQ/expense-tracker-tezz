
class UIController{
    constructor(){
        this.UISelectors = {
            swithToLogin: 'switch-login',
            switchToSignup: 'switch-signup',
            signUpPage: 'signup',
            loginPage: 'login',
            dashBoardPage: 'dashboard',
            allAccountsRightUI: '#all-accounts',
            transactionAmountSelectDropdown: '#transaction-account-select'
        }
    }
    showAuthPage() {
        console.log(this.UISelectors)

        document.getElementById(this.UISelectors.signUpPage).style.display = 'none'
        document.getElementById(this.UISelectors.dashBoardPage).style.display = 'none'
        document.getElementById(this.UISelectors.loginPage).style.display = 'block'

    }
    showDashboardPage() {
        document.getElementById(this.UISelectors.signUpPage).style.display = 'none'
        document.getElementById(this.UISelectors.dashBoardPage).style.display = 'block'
        document.getElementById(this.UISelectors.loginPage).style.display = 'none'

    }
    showErrorOnSignupPage(errorMessage){
        let errorDiv = document.getElementById('error-signup')
        errorDiv.style.display = 'block'
        errorDiv.innerText = errorMessage
        setTimeout(()=>{
            document.getElementById('error-signup').style.display = 'none'
        }, 3000)
    }
    showErrorOnLogin(errorMessage){
        let errorDiv = document.getElementById('error-login')
        errorDiv.style.display = 'block'
        errorDiv.innerText = errorMessage
        setTimeout(()=>{
            document.getElementById('error-login').style.display = 'none'
        }, 3000)
    }
    showErrorOnDashboard(errorMessage){
        let errorDiv = document.getElementById('error-dashboard')
        errorDiv.style.display = 'block'
        errorDiv.innerText = errorMessage
        setTimeout(()=>{
            document.getElementById('error-dashboard').style.display = 'none'
        }, 3000)
    }

    switchToLogin(e) {
        console.log('switch to login    ')
        let sigupPage = document.getElementById('signup')
        let loginPage = document.getElementById('login')
        sigupPage.style.display = 'none'
        loginPage.style.display = 'block'
        e.preventDefault()
    }
    switchToSignup(e) {
        console.log('switch to signup    ')
        // console.log(UISelectors)

        let sigupPage = document.getElementById('signup')
        let loginPage = document.getElementById('login')
        sigupPage.style.display = 'block'
        loginPage.style.display = 'none'
        e.preventDefault()
    }
    getSelectors() {
        return this.UISelectors
    }
    populateAccountsList(accounts){
        // done with the right side tho 
        const allAccountUL = document.querySelector('#all-accounts')

        accounts.forEach(function(account){
            let li = document.createElement("li");
            li.className = "list-group-item"
            li.style.display = 'flex'
            li.style.justifyContent = 'space-between'
            let divName = document.createElement('div')
            divName.innerText = account.accountType
            let divAmount = document.createElement('div')
            divAmount.innerText = account.accountAmount 
            li.appendChild(divName)
            li.appendChild(divAmount) 
            allAccountUL.appendChild(li)
        })
        console.log(allAccountUL)

        // Now Customizing the dropdown 
        const allAccountsDropDown = document.querySelector('#transaction-account-select')

        accounts.forEach(function(account){
            let option = document.createElement('option')
            option.value = account.accountType
            option.innerText = account.accountType
            allAccountsDropDown.appendChild(option)
        })
    }
}

export const UIControllers = new UIController()