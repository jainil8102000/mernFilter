const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("../../models/News");


function titleToSlug(title) {
    return title.replace(/[^\w\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .toLowerCase();
}

router.post('/', [
    check('title', 'News title is required').not().isEmpty(),
    check('subject', 'News subject is required').not().isEmpty()
],
    async (req, res) => {
        console.log(req.query)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { title, subject, date, image } = req.body;
        try {
            let news = await News.findOne({ title });
            if (news) {
                res.status(400).json({ errors: [{ msg: 'News already exist' }] });
            }
            let slug = titleToSlug(title)
            news = new News({
                title,
                image,
                date,
                subject,
                slug
            });
            await news.save();
            res.send('News created')
        }
        catch (err) {
            console.log(err.message)
            res.status(500).send('Server error')
        }


    });

    router.get("/", async (req, res, next) => {
        let news = await News.find({  });
        res.json(news);
    });

    router.get("/filter", async (req, res, next) => {
         const query = {};

         if(req.query.subject){
            query['subject'] = req.query.subject;
         }
         
      
        if(req.query.title){
            query['title'] = req.query.title;
        }
        
        let filterNews = await News.find(query);
        
        res.json(filterNews);
    });

module.exports = router;
