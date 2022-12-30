const sass = require('sass');
const write = require('write');

const compiled = sass.compile('./scss/index.scss');
write.sync('./build/index.css', compiled.css, { overwrite: true });