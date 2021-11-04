const fs = require("fs");
const path = require("path");

const FILE_PATH = path.resolve('apps', 'angular-raspi-ui2', 'src', 'environments', 'environment.prod.ts');

fs.readFile(FILE_PATH, (readError, data) => {
  if (readError) {
    return console.error(readError);
  }
  const result = data.toString().replace(/HOST_IP_ADDRESS/g, '192.168.0.29');
  fs.writeFile(FILE_PATH, result, (writeError) => {
    if (writeError) return console.error(writeError);
  })
})
