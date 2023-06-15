import BotClient from "./BotClient";

import fs from "fs";
const config = JSON.parse(fs.readFileSync("config/config.json", "utf-8")),
      auth = JSON.parse(fs.readFileSync("config/auth.json", "utf-8"));

const client = new BotClient(config, auth);
client.startBot();