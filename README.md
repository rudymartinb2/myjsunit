# myjsunit

myjsunit is a minimalistic testing framework for Node.js, inspired on PHPUnit. 

## Features

- Lightweight and easy to use.
- Supports writing test cases using ES6 classes and syntax.
- Provides assertion methods for common testing scenarios.
- Generates detailed test reports with pass/fail status, timings, and more.
- Easily extensible for custom test case implementations.

## Installation


clone the repo and install the package in your project from filesystem using npm, ie like this:

```
$ npm i ../myjsunit.git
```


## Usage

1. Create your test suite file, which includes your test cases. 

2. Use the myjsunit test runner to execute your test suite.

Example usage:

```
node node_modules/myjsunit/myrunner.js path/to/your/testSuite.js
```

also take a look at runtests.sh script. If you install inotifywait and use a terminal you can run your tests while saving your files.

## Writing Test Suite

example :
```javascript
import { TestSuite } from "myjsunit" ;

import { promise_Test } from "./promise/promise_Test.js" ;



class myTestSuite extends TestSuite {

    start(){
        
        this.addTest( promise_Test  );
        
        this.run();
    }
    
}

export {  myTestSuite }
```


## Writing Test Cases

1. Import the `Test` class from `myjsunit` to create test cases.

2. Extend the `Test` class and implement your test methods using descriptive names. All methods must start with the word "test" (lowercase) in order to be run.

3. Use the provided assertion methods such as `assertTrue`, `assertFalse`, `assertEquals`, etc., to validate your test conditions.

4. Use this.done() to indicate when no more assertions are left to be done for this particular test method. This is important in the case of promises when evaluating inside a callback.

Example test case:

```javascript
import { Test } from 'myjsunit';

class MyTestCase extends Test {
    test_example() {
        this.assertTrue(true, 'Example test case should pass');
        this.done();
    }

    test_example_callback() {
        let self = this;
        let fn = function(){
            self.assertTrue(true, 'Example test case should pass');
            self.done();
        };
        do_async_op( fn );
    }
}

export { MyTestCase };
```

## TO-DO

Runner should check the class is a subclass from testSuite.
There is a lot of clean up to be done.

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request on the GitHub repository.

## License

myjsunit is licensed under the MIT License. 

