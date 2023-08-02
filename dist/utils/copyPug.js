import fs from 'fs-extra';
const sourceDirectory = 'src';
const destinationDirectory = 'dist';
// Copy Pug files and view directory to dis folder
fs.copySync(`${sourceDirectory}/views`, `${destinationDirectory}/views`);
