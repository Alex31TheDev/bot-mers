import BotClient from "./BotClient";

import fs from "fs";
const config = JSON.parse(fs.readFileSync("config/config.json", "utf-8")),
      auth = JSON.parse(fs.readFileSync("config/auth.json", "utf-8"));

(async () => {
    const client = new BotClient(config, auth);
    await client.startBot();
    await client.joinSection();
})();