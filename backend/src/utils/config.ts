import * as fs from 'fs';
import path from 'path';
import { handleAndConvertError } from './helper';
let config: Record<string, any> = {};

const configPath = path.join(__dirname, '../../config.json');

// Load initial configuration
try {
  const configFileContent = fs.readFileSync(configPath, 'utf8');
  config = JSON.parse(configFileContent);
} catch (error) {
  handleAndConvertError(error);
  process.exit(1);
}

// Watch for changes in the config.json file
fs.watchFile(configPath, (curr, prev) => {
  if (curr.mtime !== prev.mtime) {
    try {
      const configFileContent = fs.readFileSync('config.json', 'utf8');
      config = JSON.parse(configFileContent);
      console.log('Configuration reloaded');
    } catch (error) {
      handleAndConvertError(error);
    }
  }
});

// Export the configuration object
export default config;
