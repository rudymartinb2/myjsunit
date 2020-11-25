import { myTestSuite } from "./myTestSuite.js";
import { console_report } from "./console_report.js";
//import { browser_html_output } from "./browser_html_output.js";
import { browser_log_output } from "./browser_log_output.js";

var report = new console_report( new browser_log_output() );
var ts = new myTestSuite( report );
ts.start();
