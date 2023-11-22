class PerformativeTransaction {
    constructor(previousPT, transformations) {
        this.previousPT = previousPT;
        this.transformations = transformations; // Array of arrays of functions
    }

    execute(startValues, steps) {
        let results = [startValues];
        let currentPT = this.previousPT;

        for (let i = 0; i < steps; i++) {
            let lastValues = results[results.length - 1];
            let transformedValues = lastValues.map((value, index) => {
                let transformFunction = this.transformations[index][i % this.transformations[index].length];
                return transformFunction(value, currentPT);
            });
            results.push(transformedValues);
        }

        return results;
    }
}

// Example Usage
const initialPT = new PerformativeTransaction(null, [
    [(x, prevPT) => prevPT ? prevPT.execute([x], 1)[1][0] : x + 1], // Transformation for first dimension
    [(y, prevPT) => prevPT ? prevPT.execute([y], 1)[1][0] : y - 1]  // Transformation for second dimension
]);

const nextPT = new PerformativeTransaction(initialPT, [
    [(x, prevPT) => x * 2, (x, prevPT) => x + 3], // Transformations for first dimension
    [(y, prevPT) => y / 2, (y, prevPT) => y - 2]  // Transformations for second dimension
]);

// User specifies the starting values for each dimension and the number of steps
console.log(nextPT.execute([5, 10], 100)); // Starting at [5, 10] and applying 10 steps







