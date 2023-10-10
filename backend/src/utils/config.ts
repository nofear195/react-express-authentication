import { readFileSync } from 'fs';
import path from 'path';
import { handleAndConvertError } from './helper';

// Define a function to load JSON data from a file
function loadJSON(filePath: string) {
  try {
    const configFileContent = readFileSync(filePath, 'utf8');
    return JSON.parse(configFileContent);
  } catch (error) {
    handleAndConvertError(error);
  }
}

const envConfigPath = path.join(__dirname, '../../env-config.json');
const envConfig = loadJSON(envConfigPath);

const googleOauthPath = path.join(__dirname, '../../google.oauth2.keys.json');
const googoleOauth2Keys = loadJSON(googleOauthPath);

export { envConfig, googoleOauth2Keys };
