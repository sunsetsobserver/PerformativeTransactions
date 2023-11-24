class PerformativeTransaction{
    constructor(inputSpace, transformations) {
        this.inputSpace = inputSpace; // inputSpace is typically an executed Performative Transaction
        this.transformations = transformations; // Object with feature names mapped to transformation functions
    }

    execute(params) { // params object provides startValues and steps for each feature that should be executed, selecting them by key name, for ex. { pitch: [60, 12] }
        
        let result = {}; // result is an object of keys and transformations

        const commonKeys = Object.keys(this.inputSpace).filter(key => Object.keys(this.transformations).includes(key) && Object.keys(params).includes(key));
        //console.log(commonKeys);

        for(let i=0; i<commonKeys.length; i++){ // for each parameter selected by the user which is being transformed by this transformation

            let thiskey = commonKeys[i];
            for(let j=0; j<params.thiskey.steps; j++){ // take the number of steps specified by the user for this transformation

                // here encode a recurrent pattern of transformation on top of recurrent input feature space
                // add modified features to the result
            }
        }

        return result; //the function should return and object of keys and transformations
    }
}

// Some feature space (recurrent pattern of functions)
const obj1 = { pitch: [function(x){return x+1}] };

// Some feature space (recurrent pattern of functions) that will be applied to the indexes of the previous feature space
const obj2 = { pitch: [function(x){return x+2}] };

const testTransaction = new PerformativeTransaction(obj1, obj2);

const testParams = { pitch: { startValue: 60, steps: 12 } };

testTransaction.execute(testParams);







