class PerformativeTransaction {
    constructor(func, referencedTransactions = []) {
        this.func = func;
        this.referencedTransactions = referencedTransactions;
    }

    getValues(steps, xArray) {
        let values = [];
        for (let i = 0; i < steps; i++) {
            let result;
            if (this.referencedTransactions.length > 0) {
                // Apply the function to get positions for each dimension
                const positions = this.func(i, ...xArray);
                // For each dimension, use the position to get the value from the corresponding referenced transaction
                result = positions.map((position, index) => {
                    if (index < this.referencedTransactions.length) {
                        return this.referencedTransactions[index].getValues(1, [position])[0];
                    }
                    return position;
                });
            } else {
                // If there are no referenced transactions, apply the function directly
                result = this.func(i, ...xArray);
            }
            values.push(result);
        }
        return values;
    }
}

// Define transactions without needing specific x1 and x2
const chromaticTransaction = new PerformativeTransaction((n, x) => x * Math.pow(2, n/12));
const velocityTransaction = new PerformativeTransaction((n, x) => x + 0.05 * n);
const otherTransaction = new PerformativeTransaction((n, x) => x + 3 * n);

// Define a multi-dimensional pattern function
const multiDimPattern = (n, ...args) => {
    return args.map((x, index) => x + n * (index + 1));
};

const testTransaction = new PerformativeTransaction((n, x) => x * Math.pow(2, n/12));
//console.log(testTransaction.getValues(12, [131]));

const thisFunction = (n, x) => {x + n};

const newTransaction = new PerformativeTransaction(thisFunction, [chromaticTransaction]);
console.log(newTransaction.getValues(12, [313]))

const majorPattern = (n) => {
    const scaleSteps = [0, 2, 4, 5, 7, 9, 11]; // Major scale intervals relative to chromatic scale
    const positionInScale = n % scaleSteps.length;
    const octaveShift = Math.floor(n / scaleSteps.length);
    const position = scaleSteps[positionInScale] + 12 * octaveShift; // Adjust for octaves
    return [position]; // Return as an array
};

const majorScaleTransaction = new PerformativeTransaction(majorPattern, [chromaticTransaction]);

function majorScale(rootNote) {
    // Major scale pattern in terms of semitones: R, W, W, H, W, W, W, H
    const pattern = [0, 2, 4, 5, 7, 9, 11, 12];
    return pattern.map(interval => chromaticTransaction.getValues(1, [rootNote + interval])[0]);
}

// Sampling:
/* const x1 = 261.6256;  // Starting pitch (C4 frequency for example)
console.log(majorScaleTransaction.getValues(14, [x1])); */

// Create a Performative Transaction with multiple dimensions
const multiDimTransaction = new PerformativeTransaction(multiDimPattern, [chromaticTransaction, velocityTransaction, majorScaleTransaction]);

// Sampling:
const xArray = [261.6256, 0.5, 440];  // Starting pitch and velocity as an array
//console.log(multiDimTransaction.getValues(5, xArray));







