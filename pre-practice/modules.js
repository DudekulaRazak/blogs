// const people = require('./people');
const {people, ages} = require('./people'); //another way to omport the required objects

console.log(people, ages); // empty if not exported from people page
 
const os = require('os');

console.log(os.platform(), os.homedir());