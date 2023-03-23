export const expense = (arr) => {
    let result = new Map();
    let shortedArr = [...arr]
    shortedArr = shortedArr.sort((a, b) => a.amount - b.amount)
    for (let i = shortedArr.length - 1; i > 0; i--) {
        const amount = shortedArr[i].amount / shortedArr.length;
        for (let j = 0; j < i; j++) {
            const amount1 = shortedArr[j].amount / shortedArr.length;

            if (amount - amount1 > 0) {
                let transactions = [];
                if (result.has(shortedArr[j].name)) {
                    transactions = result.get(shortedArr[j].name)
                }
                transactions.push({
                    name: shortedArr[i].name,
                    amount: amount - amount1,
                });
                result.set(shortedArr[j].name, transactions)
            }
        }
    }
    return result;
}
