// const aAccountsCtrl = (function (){
//     const Account = function (id,accountType, accountAmount){
//         this.id = id
//         this.accountType = accountType
//         this.accountAmount = accountAmount
//     }
//     const accountData = {
//         accounts: [
//             {id: 0, accountType: 'Cash', accountAmount: 1000},
//             {id: 1, accountType: 'Savings', accountAmount: 0},
//         ], 
//         totalAmount: 0 
//     }
//     return {
//         logData: function () {
//             return accountData
//         },
//         totalAmount: function () {
//             let total = 0 
//             accountData.accounts.forEach((account)=>{
//                 total += account.accountAmount
//             })
//             accountData.totalAmount = total
//             return accountData.totalAmount
//         }
//     }

// })()

class AccountsCtrl {

    Account = function (id,accountType, accountAmount){
        this.id = id
        this.accountType = accountType
        this.accountAmount = accountAmount
    }
    accountData = {
        accounts: [
            {id: 0, accountType: 'Cash', accountAmount: 1000},
            {id: 1, accountType: 'Savings', accountAmount: 0},
        ], 
        totalAmount: 0 
    }
        logData() {
            return this.accountData
        }
        totalAmount () {
            let total = 0 
            this.accountData.accounts.forEach((account)=>{
                total += account.accountAmount
            })
            this.accountData.totalAmount = total
            return this.accountData.totalAmount
        }
}

export const AccountControllers = new AccountsCtrl()