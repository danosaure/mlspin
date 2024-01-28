const register = require('@babel/register') ;
register({extensions: ['.js', '.jsx', '.ts', '.tsx']});

process.env.NODE_ENV = "test";
