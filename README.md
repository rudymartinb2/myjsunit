# myjsunit

myjsunit is a minimalistic testing framework for Node.js, inspired on PHPUnit API and code style. 

## Features

- Lightweight and easy to use.
- Supports writing test cases using ES6 classes and syntax.
- Provides assertion methods for common testing scenarios.
- Generates detailed test reports with pass/fail status, timings, and more.
- Easily extensible for custom test case implementations.

## Requires

NodeJS version 18+ (need to test earlier versions)

## Optional but recommended

c8 if you want code coverage:  https://www.npmjs.com/package/c8
inotifywait if you want to run your tests while saving your files. Look at your distribution packaga manager.
Linux! Or another Unix variant. I *won't* test this project under anything else (read: Windows).

## Installation

clone the repo 

```
git clone https://github.com/rudymartinb/myjsunit.git
```

then install the package in your project from filesystem using npm with relative or absolute path, like this:

```
$ npm i ../myjsunit.git
```



## Usage

1. Create your test suite file, which includes your test cases. 

2. Use the myjsunit test runner to execute your test suite.

Example usage, from your project root:

```
node node_modules/myjsunit/myrunner.js path/to/your/testSuite.js
```

You can run the tests from npm but that adds an extra delay.

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

## API

```javascript
    assertEquals( expected, actual, msg = "equals" );
    assertTrue( condition, msg = "" );
    assertFalse( condition, msg = "" );
    assertFail( msg = "assertFail() reached" );
    done(); 
```

## Testing myjsunit

assuming you already have nodejs installed, if you simply want to run the tests, from the root of the project run:

```
tests/run.sh
```

as alternative, if you have c8, inotifywait installed and are using xterm or another similar console, from the root of the project, run:

```
tests/autoruntests.sh
```

this will fire the tests while you save your edits to the project files -- credits to Kent Beck for showing us such a neat trick.


## TO-DO and know bugs

- There are some words in spanish mixed in the code.
- Rename myrunner.js as main.js.
- Need a way to test earlier versions of NodeJS.
- Runner should check the testsuit class is a subclass from testSuite.
- Adjust inotifywait parameters to recognize valid js file extensions instead of running on everything under the project tree.
- There is a lot of clean up to be done.

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request on the GitHub repository.

## License

myjsunit is licensed under the MIT License. 

