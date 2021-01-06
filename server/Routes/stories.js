const express = require('express');
const Story = require('../models/story');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        await Story.find({}, (err, result) => {
            if (err) res.send(err)
            else res.send({
                result: result
            })
        })
    } catch (err) {
        console.log(err)
    }
})

router.get('/:slug', async (req, res) => {
    try {
        const story = await Story.findOne({
            slug: req.params.slug
        })
        res.json({
            story: story
        })
    } catch (err) {
        res.sendStatus(500)
    }
})

router.post('/comment/:id', jsonParser, async (req, res) => {
    const id = req.params.id;
    const by = req.body.currentUser;
    const comment = req.body.comment;

    Story.findByIdAndUpdate(
        id, 
        { $push: { comments: { comment, by } } },
        { safe: true, upsert: true, new: true },
        (err, doc) => {
            if (err) return res.send(err)
            return res.json({
            	story: doc
            })
        }
    )
})

router.post('/new', jsonParser, async (req, res) => {

    const story = new Story({
        title: req.body.title,
        content: req.body.content,
        writtenBy: req.body.writtenBy
    })
    try {
        const postedStory = await story.save()
        res.json({
            story: postedStory
        })
    } catch (err) {
       res.json({
           message: err
       })
    }
})


router.delete('/:id', async (req, res) => {
    console.log(req.params.id)
    // await Story.findByIdAndDelete(req.params.id).then(res.send("Deleted")) 
})

router.get('/edit/:slug', async (req, res) => {
    // const story = await Story.findById(req.params.id)
    const story = await Story.find({
        slug: req.params.slug
    })
    res.send(story)
})

module.exports = router;
