import config from "./utils/config";
import app from "./services/app";

const port = config.SERVER_PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});