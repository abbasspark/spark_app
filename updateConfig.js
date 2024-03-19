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
  if (process.argv.length !== 6) {
    console.log('Usage: node updateConfig.js chromiumPath <chromiumPathValue> model <modelValue>');
    process.exit(1);
  }

  const chromiumPathIndex = process.argv.indexOf('chromiumPath');
  const modelIndex = process.argv.indexOf('model');

  if (chromiumPathIndex !== -1 || modelIndex === -1) {
    console.log('Usage: node updateConfig.js chromiumPath <chromiumPathValue> model <modelValue>');
    process.exit(1);
  }

  const chromiumPathValue = process.argv[chromiumPathIndex + 1];
  const modelValue = process.argv[modelIndex + 1];

  updateConfig('chromiumPath', chromiumPathValue);
  updateConfig('model', modelValue);
  saveConfigToFile(config);
}

startConfiguration();
