const moment = require('moment');

const start = 1551369600000;

const now = new Date();

console.log(moment(start).add(3, 'months').valueOf());