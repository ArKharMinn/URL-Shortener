const urlSchema=require("../models/url")
const shortid = require("shortid")

exports.index = async(req,res)=>{
    const shortUrls = await urlSchema.find()
    res.render("index",{shortUrls})
}

exports.shorten= async (req,res) => {
    const {fullUrl}= req.body
    const shortUrl = shortid.generate()
    await urlSchema.create({
    full: fullUrl,
    short: shortUrl
  });

  res.redirect('/');
}

exports.shortUrl = async (req,res) => {
    const shortUrl = await urlSchema.findOne({ short: req.params.shortUrl });

  if (shortUrl == null) return res.sendStatus(404);

  shortUrl.clicks++;
  await shortUrl.save();

  res.redirect(shortUrl.full);
}

exports.delete = async (req, res) => {
  try {
    await urlSchema.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting URL");
  }
};
