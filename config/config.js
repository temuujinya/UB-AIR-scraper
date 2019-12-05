/*
For env
https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786
*/
const dotenv = require('dotenv').config({path:'./.env'});

if(dotenv.error)
    throw dotenv.error

const {parsed:envs} = dotenv;
// console.log(envs);
module.exports=envs;