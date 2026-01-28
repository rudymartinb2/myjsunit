# myjsunit

myjsunit is a minimalistic testing framework for Node.js, inspired on PHPUnit API and code style. It is intended to be run from virtual console like `xterm` or `konsole`.

![running](/img/screenshot.png)


## Features

- Supports writing test cases using ES6 classes and syntax.
- Provides assertion methods for common testing scenarios.
- Generates detailed test reports with pass/fail status, timings, and more.
- Easily extensible for custom test case implementations.
- You can use it with other packages to test frontend code.

## Requires

- NodeJS version 18+
- Recommended project type module, at least for the unit tests.


## Optional but recommended

- c8 if you want code coverage:  https://www.npmjs.com/package/c8
- inotifywait if you want to run your tests while saving your files. Look at your distribution package manager.
- Linux! Or another Unix variant. I *won't* test this project under anything else (read: Windows).

## Installation

from your project's root, do:

```
$ npm i https://github.com/rudymartinb2/myjsunit.git
```



## Usage

1. Create your test suite file, which includes your test cases. 


example :

```javascript
import { TestSuite } from "myjsunit" ;

import { MyTestCase_Test } from "./MyTestCase_Test.js" ;

class sampleTestSuite extends TestSuite {
    start(){
        this.addTest( MyTestCase_Test ); // only constructor is needed.
        this.run();
    }
}

export {  myTestsampleTestSuiteSuite }
```


2. create individual files for each Unit Test Cases:
- Import the `Test` class from `myjsunit` to create test cases.
- Extend the `Test` class and implement your test methods using descriptive names. 
- All methods must start with the word "test" (lowercase) in order to be run.
- Use the provided assertion methods such as `assertTrue`, `assertFalse`, `assertEquals`, etc., to validate your test conditions.
- Use this.done() to indicate when no more assertions are left to be done for this particular test method. This is important in the case of promises when evaluating inside a callback.

Example:

```javascript
import { Test } from 'myjsunit';

class MyTestCase_Test extends Test {
    test_example_true() {
        this.assertTrue(true, 'Example test case should pass');
        this.done();
    }

    test_example_callback() {
        let self = this;
        let fn = function(){
            self.assertTrue(true, 'Example test case should pass');
            self.done();
        };
        setTimeout(fn, 0);
    }
}
 
export { MyTestCase_Test };
```

3. Use the myjsunit test runner to execute your test suite.

Minimal example usage, from your project root:

```
node node_modules/myjsunit/myrunner.js ./testsjs/sampleTestSuite.js
```


It is recommended to take a look at the scripts inside node_modules/myjsunit/test mentioned in the next section.

Also you can run the tests from npm but that adds an extra delay.

Exmaple of code coverage details from a web browser:

![code coverage exmaple](/img/coverage_report.png)

## API

```javascript
    assertEquals( expected, actual, msg = "equals" );
    assertTrue( condition, msg = "" );
    assertFalse( condition, msg = "" );
    assertFail( msg = "assertFail() reached" );
    done(); 
```

## Testing myjsunit code

if you simply want to run the tests, from the root of the project run:

```
tests/run_tests.sh
```

as alternative, if you have c8, inotifywait installed and are using xterm or another similar console, from the root of the project, run:

```
tests/autoruntests.sh
```

this will fire the tests while you save your edits to the project files -- credits to Kent Beck for showing us such a neat trick.


## TO-DO and know bugs

- There are some words in spanish mixed in the code.
- Rename myrunner.js as main.js.
- My English may be good, but is not *that* good. If are a native English speaker and you think something is wrong please let me know. 


## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request on the GitHub repository.

## License

myjsunit is licensed under the MIT License. 

