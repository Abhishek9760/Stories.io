const express = require('express');
const Story = require('../models/story');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const router = express.Router();


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

router.post('/clap/:id', jsonParser, async (req, res) => {
    const username = req.body.username;
    let isClapped = false

    try {
        const story = await Story.findById(req.params.id)
        if (story.claps.indexOf(username) === -1) {
            story.claps.push(username);
            isClapped = true
        }
        else {
            story.claps.pull(username);
            isClapped = false
        }

        await story.save()
            
        if (isClapped == true) 
            res.json({
                increment: true
            })
        else 
            res.json({
                decrement: true
            })
    } catch (err) {
        console.log(err)
    }

})

router.delete('/delete/:id', async (req, res) => {
    await Story.findByIdAndDelete(req.params.id)
        .then(res.send({
            status: 'success'
        }))
        .catch(err => {
            res.send({
                err: err
            })
        })
})

router.post('/edit/:id', jsonParser, async (req, res) => {

    try {
        const story = await Story.findById(req.params.id)
        story.title = req.body.title
        story.content = req.body.content
        const updatedStory = await story.save()
        res.send({
            updatedStory: updatedStory
        })
    } catch (err) {
        res.json({
            error: err
        })
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

router.get('/', async (req, res) => {
        
    const username = req.query.name;
    const filter = username === undefined
                            ? {} 
                            : { writtenBy: username }

    try {
        await Story.find(filter, (err, result) => {
            if (err) res.send(err)
            else res.send({
                result: result
            })
        })
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;
