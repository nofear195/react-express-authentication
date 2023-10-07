import * as fs from 'fs';
import path from 'path';

let config: Record<string, any> = {};

const configPath = path.join(__dirname, '../../config.json')

// Load initial configuration
try {
    const configFileContent = fs.readFileSync(configPath, 'utf8');
    config = JSON.parse(configFileContent);
} catch (err: unknown) {
    console.error(`Error reading or parsing config.json: ${(err as Error).message}`);
    process.exit(1);
}

// Watch for changes in the config.json file
fs.watchFile(configPath, (curr, prev) => {
    if (curr.mtime !== prev.mtime) {
        try {
            const configFileContent = fs.readFileSync('config.json', 'utf8');
            config = JSON.parse(configFileContent);
            console.log('Configuration reloaded');
        } catch (err: unknown) {
            console.error(`Error reading or parsing config.json: ${(err as Error).message}`);
        }
    }
});

// Export the configuration object
export default config;
