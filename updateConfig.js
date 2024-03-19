const fs = require('fs');

const config = require('./src/config/index.js');

function updateConfig(key, value) {
  config[key] = value;
}

function saveConfigToFile(configObject) {
  const configString = `module.exports = ${JSON.stringify(configObject, null, 2)};\n`;
  fs.writeFile('./src/config/index.js', configString, (err) => {
    if (err) {
      console.error('Error writing to config file:', err);
    } else {
      console.log('Config updated successfully.');
    }
  });
}

function startConfiguration() {
  if (process.argv.length < 4 || process.argv.length % 2 !== 0) {
    console.log('Usage: node updateConfig.js <key1> <value1> <key2> <value2> ...');
    process.exit(1);
  }

  for (let i = 2; i < process.argv.length; i += 2) {
    const key = process.argv[i];
    const value = process.argv[i + 1];
    updateConfig(key, value);
  }

  saveConfigToFile(config);
}

startConfiguration();
