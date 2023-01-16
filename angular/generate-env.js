const {outputFileSync} = require("fs-extra");

// read environment variables from .env file
require('dotenv').config();

// read the command line arguments passed with yargs
const isProduction = process.env.DEV === 'PRODUCTION';

const targetPath = `./src/environments/environment.ts`;

// we have access to our environment variables
// in the process.env object thanks to dotenv
const environmentFileContent = `
export const environment = {
   production: ${isProduction},
   BASE_URL: "${process.env.BASE_URL}",
};
`;

// write the content to the respective file
outputFileSync(targetPath, environmentFileContent, function (err) {
  if (err) {
    console.log(err);
  }

  console.log(`Wrote variables to ${targetPath}`);
});
