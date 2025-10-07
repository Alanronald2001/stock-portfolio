import dotenv from "dotenv";
dotenv.config();

import { App } from "./app";

const PORT = process.env.PORT || 8000;

const appInstance = new App();
const app = appInstance.getApp();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
