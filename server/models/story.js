const mongoose = require('mongoose');
const slugify = require('slugify')
const marked = require('marked');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom')
const domPurify = createDomPurify(new JSDOM().window) 


const storySchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    claps: {
        type: Array,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    convertedHtml: {
        type: String,
        required: true
    },
    writtenBy: {
        type: String,
        required: true
    },
    comments: {
        type: Array
    }
});

storySchema.pre('validate', function (next) {
    if (this.title) {
        this.slug = slugify(this.title, {
            lower: true,
            strict: true
        })
    }

    if (this.content) {
        this.convertedHtml = domPurify.sanitize(marked(this.content))
    }

    next()
})

module.exports = mongoose.model('Story', storySchema, 'story')