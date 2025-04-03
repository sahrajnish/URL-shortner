const express = require("express");
const { handleGenerateNewShortUrl, handleGetToTheUrl, handleGetUrlAttribute } = require("../controllers/url.controllers.js");

const router = express.Router();

router.post('/', handleGenerateNewShortUrl);

router.get('/:shortId', handleGetToTheUrl);

router.get('/analytics/:shortId', handleGetUrlAttribute);

module.exports = router;