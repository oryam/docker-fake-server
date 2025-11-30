function processA() {
    let total = 0;

    for (let i = 0; i < 300_000; i++) {
        const flag = i % 2;
        console.log(`flag: ${flag}`);

        switch (flag) {
            case 0:
                total += 1;
                break;
            case 1:
                total += 2;
                break;
        }
    }

    return total;
}

// console.time("execution");

let result = processA();

// console.timeEnd("execution");
console.log("Résultat :", result);
