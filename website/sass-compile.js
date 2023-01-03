const sass = require('sass');
const write = require('write');

const compiled = sass.compile('./src/scss/index.scss');
write.sync('./build/index.css', compiled.css, { overwrite: true });