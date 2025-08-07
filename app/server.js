const express = require("express");
const bodyParser = require("body-parser");
const Redis = require("ioredis");
const path = require("path");

const app = express();
const redis = new Redis({ host: process.env.REDIS_HOST || "localhost" });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

const GUESTBOOK_KEY = "guestbook:entries";

app.get("/", async (req, res) => {
    const entries = await redis.lrange(GUESTBOOK_KEY, 0, 9);
    const parsedEntries = entries.map(entry => JSON.parse(entry));
    res.render("index", { entries: parsedEntries });
});

app.post("/sign", async (req, res) => {
    const { name, message } = req.body;
    if (name && message) {
        const entry = { name, message, time: new Date().toLocaleString() };
        await redis.lpush(GUESTBOOK_KEY, JSON.stringify(entry));
    }
    res.redirect("/");
});

app.listen(5000, () => console.log("Guestbook running on port 5000"));