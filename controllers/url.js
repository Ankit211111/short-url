const URL = require("../models/url.js");
const ShortUniqueId =require("short-unique-id")
const shortid = new ShortUniqueId({ length: 10 });

async function handleCreateShortUrl (req,res){
    const body = req.body;
   
     if(!body.url) return res.status(400).json({msg:"url needed"})
     const shortID = shortid.rnd();
     await URL.create({
          shortId:shortID,
          redirectUrl:body.url,
          visitHistory:[],
          createdBy:req.user._id,
     })
     return res.render("home",{id:shortID,});

}
async function handleRedirectUrl(req,res){
    const shortid = req.params.shortId;
    
   const entry = await URL.findOneAndUpdate({shortId:shortid},{
    $push:{visitHistory:{timestamp:Date.now()}}
   })
   
   res.redirect(entry?.redirectUrl)
}
async function handleAnalyticsOfUrl(req,res){
    const shortid = req.params.shortId;
    const entry= await URL.findOne({shortId:shortid})
   
    res.json({totalClicks:entry.visitHistory.length})
}
module.exports ={
    handleCreateShortUrl,
    handleRedirectUrl,
    handleAnalyticsOfUrl,
}