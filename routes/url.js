const express = require("express");
const router = express.Router();

const{handleCreateShortUrl,handleRedirectUrl,handleAnalyticsOfUrl} = require("../controllers/url")

router.post("/",handleCreateShortUrl);
router.get("/:shortId",handleRedirectUrl);
router.get("/analytics/:shortId",handleAnalyticsOfUrl);


module.exports = router;