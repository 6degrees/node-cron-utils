const CronExpression = require('./lib/cjs/gpt');


const expression1 = new CronExpression('* * * * * *');

expression1.double();