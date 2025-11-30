function processB() {
    let total = 0;

    for (let i = 0; i < 300_000; i++) {
        const flag = i % 2; // 0 ou 1

        if (flag)
            total = total + 2;
        else
            total = total + 1;

    }

    return total;
}

// console.time("execution");

let result = processB();

// console.timeEnd("execution");
console.log("Résultat :", result);
