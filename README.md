# myjsunit
NodeJS based minimalistict framework for Linux console based on PHPUnit.

Almost no dependencies: just nodejs, a linux terminal and inotifywait (optional but highly recommended).-

Alpha version. You might need to edit testjs.sh to suit your needs. Comments are welcome.

While developing a project, on a secondary monitor/desktop you can have a terminal running testjs.sh from your project source directory. Each time you write a file on disk it will fire the tests.

An attept to write a browser report was made but it's incomplete. There's a browser console report which works like the terminal but you will need to refresh the page to run the tests.
