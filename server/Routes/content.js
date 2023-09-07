const express = require('express');

const { addContent, getContents, getContent, updateContent, deleteContent } = require('../Controllers/content.js');

const router = express.Router();

router.post('/', addContent);
router.get('/', getContents);
router.get("/:_id", getContent);
router.put("/:_id", updateContent);
router.delete("/:_id", deleteContent);

module.exports = router;