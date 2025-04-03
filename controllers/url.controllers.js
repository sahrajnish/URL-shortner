const URL = require("../models/url.models.js")
const shortId = require("shortid");

const handleGenerateNewShortUrl = async (req, res) => {
    const body = req.body;
    if(!body.url) {
        return res.status(400).json({error: "URL is required."})
    }
    const url = shortId.generate()
    await URL.create(
        {
            shortId: url,
            redirectURL: body.url,
            visitHistory: []
        }
    );

    return res.json({id: url})
}

const handleGetToTheUrl = async (req, res) => {
    const short = req.params.shortId;
    console.log(short);
    const entry = await URL.findOneAndUpdate(
        {
            shortId: short
        },
        {
            $push: {
                visitHistory: {
                    timestamps: Date.now()
                }
            }
        }
    );

    // add url with https:// in redirect() else TypeError: Cannot read properties of null
    res.redirect(`https://${entry.redirectURL}`);
}

const handleGetUrlAttribute = async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOne({ shortId: shortId });
    console.log(entry);
    return res.json({views: entry.visitHistory.length, id: [entry.visitHistory]})
}

module.exports = {
    handleGenerateNewShortUrl,
    handleGetToTheUrl,
    handleGetUrlAttribute
}