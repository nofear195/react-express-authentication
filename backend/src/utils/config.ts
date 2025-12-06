import { existsSync, readFileSync } from 'fs';
import path from 'path';
import { handleAndConvertError } from './helper';

// Define a function to load JSON data from a file
function loadJSON(filePath: string, label: string) {
  try {
    if (!existsSync(filePath)) {
      console.warn(
        `[config] Optional config "${label}" missing at ${filePath}. Using an empty object instead.`,
      );
      return {};
    }
    const configFileContent = readFileSync(filePath, 'utf8');
    return JSON.parse(configFileContent);
  } catch (error) {
    handleAndConvertError(error);
  }
}

const envConfigPath = path.join(__dirname, '../../env-config.json');
const envConfig = loadJSON(envConfigPath, 'env-config');

const googleOauthPath = path.join(__dirname, '../../google.oauth2.keys.json');
const googoleOauth2Keys = loadJSON(googleOauthPath, 'google.oauth2.keys');

const awsCognitoPath = path.join(__dirname, '../../aws.cognito.json');
const awsCognitoConfig = loadJSON(awsCognitoPath, 'aws.cognito');

export { envConfig, googoleOauth2Keys, awsCognitoConfig };
