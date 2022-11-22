class UIController {
    constructor() {
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
    showErrorOnSignupPage(errorMessage) {
        let errorDiv = document.getElementById('error-signup')
        errorDiv.style.display = 'block'
        errorDiv.innerText = errorMessage
        setTimeout(() => {
            document.getElementById('error-signup').style.display = 'none'
        }, 3000)
    }
    showErrorOnLogin(errorMessage) {
        let errorDiv = document.getElementById('error-login')
        errorDiv.style.display = 'block'
        errorDiv.innerText = errorMessage
        setTimeout(() => {
            document.getElementById('error-login').style.display = 'none'
        }, 3000)
    }
    showErrorOnDashboard(errorMessage) {
        let errorDiv = document.getElementById('error-dashboard')
        errorDiv.style.display = 'block'
        errorDiv.innerText = errorMessage
        setTimeout(() => {
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
    appendAccountToList(account) {
        const allAccountUL = document.querySelector('#all-accounts')
        const allAccountsDropDown = document.querySelector('#transaction-account-select')
        let option = document.createElement('option')

        let li = document.createElement("li");
        li.className = "list-group-item"
        li.style.display = 'flex'
        li.style.justifyContent = 'space-between'

        let divName = document.createElement('div')
        let divAmount = document.createElement('div')
        divName.innerText = account["account-type"]
        divAmount.innerText = account["account-amount"]

        li.appendChild(divName)
        li.appendChild(divAmount)

        allAccountUL.appendChild(li)

        option.value = account["account-amount"]
        option.innerText = account["account-type"]
        option.id = account["id"]
        allAccountsDropDown.appendChild(option)

        this.calculateSingleAccountAmountAddToUI(account["account-amount"])


    }
    // <li class="list-group-item" style="display: flex;justify-content: space-between;">
    //                         <div id="list-category" style="font-weight:400;">Shooping</div>
    //                         <div id="list-account">Meezan Bank</div>
    //                         <div id="list-date">Date</div>
    //                         <div id="list-amount">Rs - 15000 PKr</div>
    // </li>
    appendTransactionsToList(tId, transactionAccountName, actualTransactionAmount, transactionType) {
        const allTransactionsEL = document.getElementById('all-transactions')

        const li = document.createElement('li')
        li.className = 'list-group-item'
        li.style.display = 'flex'
        li.style.justifyContent = 'space-between'
        li.id = tId

        const categoryDiv = document.createElement('div')
        categoryDiv.style.width = '20%'
        categoryDiv.style.fontWeight = '400'
        categoryDiv.innerText = transactionType
        li.appendChild(categoryDiv)

        const divAccount = document.createElement('div')
        divAccount.style.width = '20%'
        divAccount.innerText = transactionAccountName
        li.appendChild(divAccount)

        const dateDiv = document.createElement('div')
        dateDiv.style.width = '20%'

        const date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let currentDate = `${month} ${day}, ${year}`;

        dateDiv.innerText = currentDate
        li.appendChild(dateDiv)

        const amountDiv = document.createElement('div')
        amountDiv.style.color = actualTransactionAmount >= 0 ? 'green' : 'red'
        amountDiv.innerText = actualTransactionAmount + ' PKR'
        li.appendChild(amountDiv)

        allTransactionsEL.appendChild(li)
    }
    populateTransactionsToList(transactions) {
        const allTransactionsEL = document.getElementById('all-transactions')

        transactions.forEach(transaction => {

            const li = document.createElement('li')
            li.className = 'list-group-item'
            li.style.display = 'flex'
            li.style.justifyContent = 'space-between'
            li.id = transaction.id
    
            const categoryDiv = document.createElement('div')
            categoryDiv.style.width = '20%'
            categoryDiv.style.fontWeight = '400'
            categoryDiv.innerText = transaction["category"]
            li.appendChild(categoryDiv)
    
            const divAccount = document.createElement('div')
            divAccount.style.width = '20%'
            divAccount.innerText = transaction["account-name"]
            li.appendChild(divAccount)
    
            const dateDiv = document.createElement('div')
            dateDiv.style.width = '20%'
            const date = new Date(transaction["date"].toDate());
            console.log(date)

            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            let currentDate = `${month} ${day}, ${year}`;
            dateDiv.innerText = currentDate
            li.appendChild(dateDiv)
    
            const amountDiv = document.createElement('div')
            amountDiv.style.color = transaction["transaction-amount"] >= 0 ? 'green' : 'red'
            amountDiv.innerText = transaction["transaction-amount"] + ' PKR'
            li.appendChild(amountDiv)
    
            allTransactionsEL.appendChild(li)
        })
 
    
    }
    populateAccountsList(accounts) {
        // done with the right side tho 
        const allAccountUL = document.querySelector('#all-accounts')

        accounts.forEach(function (account) {
            let li = document.createElement("li");
            li.className = "list-group-item"
            li.style.display = 'flex'
            li.style.justifyContent = 'space-between'
            let divName = document.createElement('div')
            divName.innerText = account["account-type"]
            let divAmount = document.createElement('div')
            divAmount.innerText = account["account-amount"]
            li.appendChild(divName)
            li.appendChild(divAmount)
            allAccountUL.appendChild(li)
        })
        console.log(allAccountUL)

        // Now Customizing the dropdown 
        const allAccountsDropDown = document.querySelector('#transaction-account-select')

        accounts.forEach(function (account) {
            let option = document.createElement('option')
            option.value = account["account-amount"]
            option.innerText = account["account-type"]
            // option.name = account["account-type"]
            option.id = account["id"]
            allAccountsDropDown.appendChild(option)
            if (account["account-type"] == "Cash") {
                UIController.populateDashBoardCash(account["account-amount"])
            }
            if (account["account-type"] == "Bank") {
                UIController.populateDashBoardBank(account["account-amount"])
            }
        })
    }
    calculateTotalAccountAmountAddToUI(accounts) {
        let total = 0;
        accounts.forEach(account => {
            total += account["account-amount"]
        })
        let transactionDisp = document.getElementById("transaction-amount-disp")
        transactionDisp.innerText = "PKR " + total
    }
    calculateSingleAccountAmountAddToUI(amount) {
        let transactionDisp = document.getElementById("transaction-amount-disp")
        let ammountDisp = transactionDisp.innerText.split(" ")[1]
        let totalAmountDisp = parseInt(ammountDisp) + parseInt(amount)
        transactionDisp.innerText = "PKR " + totalAmountDisp
    }
    static populateDashBoardCash(amount) {
        document.getElementById('dashboard-cash').innerText = amount

    }
    static populateDashBoardBank(amount) {
        document.getElementById('dashboard-bank').innerText = amount

    }
    static addToDashBoardCash(amount) {
        let DCash = document.getElementById('dashboard-cash')
        let current = parseInt(Dcash.innerText)
        DCash.innerText = current + parseInt(amount)

    }
    static addToDashBoardBank(amount) {
        let DBank = document.getElementById('dashboard-bank')
        let current = parseInt(DBank.innerText)
        DBank.innerText = current + parseInt(amount)
    }
}

export const UIControllers = new UIController()