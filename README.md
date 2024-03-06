# myjsunit

myjsunit is a minimalistic testing framework for Node.js, inspired by PHPUnit. 

## Features

- Lightweight and easy to use.
- Supports writing test cases using ES6 classes and syntax.
- Provides assertion methods for common testing scenarios.
- Generates detailed test reports with pass/fail status, timings, and more.
- Easily extensible for custom test case implementations.

## Installation

Until the package is stable, I won't publish it to npm. At the moment just clone the repo and add a reference to your package.json, something like this

```
{
    "type": "module",
    "scripts": {
        "test": "node node_modules/myjsunit/myrunner.js /home/rudy/37sur/oltsm2/testsjs/myTestSuite.js"
    },
    "dependencies": {
        "myjsunit": "file:../myjsunit",
        (...)
    }
}
```

if something goes wrong install the package from filesystem using npm.

## Usage

1. Create your test suite file, which includes your test cases.

2. Use the myjsunit test runner to execute your test suite.

Example usage:

```
node node_modules/myjsunit/myrunner.js path/to/your/testSuite.js
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
}

export { MyTestCase };
```

## TO-DO

There is a lot of clean up to be done.

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request on the GitHub repository.

## License

myjsunit is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

