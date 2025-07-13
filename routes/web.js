const express = require("express")
const router = express.Router()
const urlController = require("../controllers/urlController")

router.get("/",urlController.index)
router.post("/shorten",urlController.shorten)
router.get("/:shortUrl",urlController.shortUrl)
router.post("/delete/:id", urlController.delete);

module.exports=router