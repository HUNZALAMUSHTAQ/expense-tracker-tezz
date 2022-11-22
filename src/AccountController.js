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
import { collection, getDocs, addDoc, doc, getDoc } from "firebase/firestore"
import { db } from "./firebase";

class AccountsCtrl {

    Account = function (id, accountType, accountAmount) {
        this.id = id
        this.accountType = accountType
        this.accountAmount = accountAmount
    }
    accountData = {
        accounts: [
            { id: 0, accountType: 'Cash', accountAmount: 1000 },
            { id: 1, accountType: 'Savings', accountAmount: 0 },
            { id: 2, accountType: 'Meezan Bank', accountAmount: 1000 },

        ],
        totalAmount: 0
    }
    async getSingleUserAccountData(userUID, dataID) {
        const path = `/users/${userUID}/bank-accounts/${dataID}`
        const docRef = doc(db, path);
        const docSnap = await getDoc(docRef);

        const data = docSnap.data()
        const dataId = docSnap.id
        return { ...data, id: dataID }

    }
    async getAllTransactionsData(userUID) {
        try {
            if (userUID) {
                const path = `/users/${userUID}/transactions`
                const querySnapshot = await getDocs(collection(db, path));
                let transactions = []
                querySnapshot.forEach((doc) => {
                    transactions.push({ ...doc.data(), id: doc.id })

                });
                console.log(transactions)
                return transactions
            } else {
                console.log("user UID Doesnot exist duh")
                return false
            }
        } catch (error) {
            console.log("Error Getting Data From the FireBase", e)
        }
    }
    async getAllUserAccountsData(userUID) {
        try {
            if (userUID) {
                const path = `/users/${userUID}/bank-accounts`
                const querySnapshot = await getDocs(collection(db, path));
                let accounts = []
                querySnapshot.forEach((doc) => {
                    accounts.push({ ...doc.data(), id: doc.id })

                });
                console.log(accounts)
                return accounts
            } else {
                console.log("user UID Doesnot exist duh")
                return false
            }
        } catch (error) {
            console.log("Error Getting Data From the FireBase", e)
        }
    }
    async createNewAccountForUser(userUID, accountType, accountAmount) {
        try {
            const path = `/users/${userUID}/bank-accounts`

            const docRef = await addDoc(collection(db, path), {
                "account-type": accountType,
                "account-amount": parseInt(accountAmount)
            });
            console.log("Document written with ID: ", docRef.id);
            return docRef.id
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    async createNewTransactionForUser(userUID, accountName, transactionAmount, category) {
        try {
            const path = `/users/${userUID}/transactions`

            const docRef = await addDoc(collection(db, path), {
                "account-name": accountName,
                "transaction-amount": transactionAmount,
                "category": category,
                "date": new Date()
            });
            console.log("Document written with ID: ", docRef.id);
            return docRef.id
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    logData() {
        return this.accountData
    }
    totalAmount() {
        let total = 0
        this.accountData.accounts.forEach((account) => {
            total += account.accountAmount
        })
        this.accountData.totalAmount = total
        return this.accountData.totalAmount
    }
    calculateManyExpenses(transactionList){
        let expenses = 0;
        let income = 0;
        transactionList.forEach(transaction => {
            if(transaction["transaction-amount"] < 0){
                expenses -= parseInt(transaction["transaction-amount"])
            }else{
                income +=  parseInt(transaction["transaction-amount"]) 
            }
        })
        document.getElementById('dashboard-expenses').innerText = expenses
        return {expenses, income}
    }
}

export const AccountControllers = new AccountsCtrl()