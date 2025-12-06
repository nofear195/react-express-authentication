import {envConfig} from "./utils/config";
import app from "./services/app";

const port = envConfig.SERVER_PORT || 3000;


// Start the Express server
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// Gracefully shut down the server on process exit
process.on('SIGINT', () => {
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});