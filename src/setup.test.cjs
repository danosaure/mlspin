const register = require('@babel/register') ;
register({extensions: ['.js', '.jsx', '.ts', '.tsx']});

console.log('in setup.test.js');

process.env.NODE_ENV = "test";
