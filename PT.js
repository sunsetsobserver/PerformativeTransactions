class PerformativeTransaction{
    constructor(inputSpace, transformations) {
        this.inputSpace = inputSpace; // inputSpace is typically an executed Performative Transaction
        this.transformations = transformations; // Object with feature names mapped to transformation functions
    }

    //Recursive function to calculate indexes:
    recursiveApply(funcs, x, result) {
        if (funcs.length === 0) {
          return result;
        } else {
          const new_x = funcs[0](x);
          result.push(new_x);
          return this.recursiveApply(funcs.slice(1), new_x, result);
        }
    }

    execute(params, funcOrVal) { 
        // params object provides startValues and steps for each feature that should be executed, selecting them by key name, for ex. { pitch: [60, 12] }
        // funcOrVal decides if the result is an array of functions (to be passed further) (false) or an array of fixed values (true)
        
        let result = {}; // result is an object of keys and transformations

        const commonKeys = Object.keys(this.inputSpace).filter(key => Object.keys(this.transformations).includes(key) && Object.keys(params).includes(key));

        for(let i=0; i<commonKeys.length; i++){ // for each parameter selected by the user which is being transformed by this transformation

            let thiskey = commonKeys[i];

            let inputFeature = this.inputSpace[thiskey];
            let transformationFeature = this.transformations[thiskey];
            
            let actualTransformations = []; // the actual array of transformations (for the number of input steps)
            let resultingFeature = [];

            for(let j=0; j<params[thiskey].steps-1; j++){ // take the number of steps specified by the user for this transformation

                // 1) Construct the actual array of transformations (for the number of input steps):
                actualTransformations.push(transformationFeature[j % transformationFeature.length]);
            }

            // Calculate indexes by recursivelly using actualTransformations:
            let indexes = this.recursiveApply(actualTransformations, 0, [0])

            for(let k=0; k<indexes.length; k++){ // select the from the input space the indexes calculated by the transformation space 

                // 2) Construct the array of the final resulting feature (of transformations):

                resultingFeature.push(inputFeature[indexes[k] % inputFeature.length]);
            }

            if(funcOrVal){
                let values = this.recursiveApply(resultingFeature, params[thiskey].startValue, [params[thiskey].startValue])
                result[thiskey] = values;
            }else{
                result[thiskey] = resultingFeature;
            }
        }

        return result; //the function should return an object of keys and transformations
    }
}

// DEFINE FEATURE SPACES AND CREATE A NEW PERFORMATIVE TRANSACTION:

// Some feature space (recurrent pattern of functions)
const obj1 = { pitch: [function(x){return x+1}, function(x){return x+2}] }; // x here is the actual value actualised with the startValue of input params

// Some feature space (recurrent pattern of functions) that will be applied to the indexes of the previous feature space
const obj2 = { pitch: [function(x){return x+2}, function(x){return x+1}] }; // x here is the index o obj1

// Define the params object of starting values:
const testParams = { pitch: { startValue: 1, steps: 12 } };

// Create a new Performative Transaction:
const testTransaction = new PerformativeTransaction(obj1, obj2);

// EXECUTE PERFORMATIVE TRANSACTION:
console.log(testTransaction.execute(testParams, false));
