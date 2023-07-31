const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const app = require("./app");

const port = process.env.PORT || 8000;
app.listen(port, "127.0.0.1", () => {
  console.log(`App listening on port : ${port}`);
});
