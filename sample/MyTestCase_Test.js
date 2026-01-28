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