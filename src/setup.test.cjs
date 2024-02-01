const register = require('@babel/register') ;
register({extensions: ['.js', '.jsx', '.ts', '.tsx']});

process.env.NODE_ENV = "test";

const chai = require('chai');
const dirtyChai = require('dirty-chai');
chai.use(dirtyChai);
