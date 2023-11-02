class PerformativeTransaction {
    constructor(func, referencedTransactions = []) {
        if (referencedTransactions.length) {
            this.func = (n, xArray) => {
                const positions = func(n);
                return positions.map((position, index) => {
                    return referencedTransactions[index].func(position, xArray[index]);
                });
            };
        } else {
            // Otherwise, use the provided function directly
            this.func = func;
        }
    }

    getValues(steps, xArray) {
        let values = [];
        for (let i = 0; i < steps; i++) {
            values.push(this.func(i, xArray));
        }
        return values;
    }
}

// Define transactions without needing x1 and x2
const chromaticTransaction = new PerformativeTransaction((n, x) => x * Math.pow(2, n/12));
const velocityTransaction = new PerformativeTransaction((n, x) => x + 0.05 * n);

const multiDimPattern = (n) => {
    return [n * 2, n + 0.5];
};

const multiDimTransaction = new PerformativeTransaction(multiDimPattern, [chromaticTransaction, velocityTransaction]);

// Sampling:
/* const x1 = 261.6256;  // Starting pitch
const x2 = 0.5;      // Starting velocity
console.log(multiDimTransaction.getValues(20, [x1, x2])); */

const majorPattern = (n) => {
    const scaleSteps = [0, 2, 4, 5, 7, 9, 11]; // Major scale intervals relative to chromatic scale
    const positionInScale = n % scaleSteps.length;
    const octaveShift = Math.floor(n / scaleSteps.length);
    const position = scaleSteps[positionInScale] + 12 * octaveShift; // Adjust for octaves
    return [position]; // Return as an array
};

const majorScaleTransaction = new PerformativeTransaction(majorPattern, [chromaticTransaction]);

// Sampling:
const x1 = 261.6256;  // Starting pitch (C4 frequency for example)
console.log(majorScaleTransaction.getValues(14, [x1]));







