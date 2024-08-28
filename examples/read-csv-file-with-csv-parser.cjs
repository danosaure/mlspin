const fs = require('fs');
const path = require('path');

const parse = require('csv-parse/sync').parse;

const csvFilePath = path.resolve(__dirname, '../tmp/idx-download/20240828/idx_cc_sld.txt');
const input = fs.readFileSync(csvFilePath, 'utf-8');

const records = parse(input, {
  columns: true,
  skip_empty_lines: true,
  skip_lines_with_error: true,
  trim: true,
  delimiter: '|',
});

console.log(records);
