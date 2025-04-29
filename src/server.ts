import app from "./app";
import dotenv from "dotenv";
import config from "./config";

dotenv.config();

const PORT = config.port || 5001;

async function main() { 
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

main();
