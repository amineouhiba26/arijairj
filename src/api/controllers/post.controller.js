const slugify = require('slugify');
const db = require('../../database/db.config');
const Post = require('../models/post.model')(db.mongoose);

// Create
exports.create = (req, res) => {
    const { title, content, author, slug, tags } = req.body;
    if (!title || !content || !author || !slug) {
        return res.status(400).send({ message: 'content can not be empty' });
    }
    const slugy = slugify(slug, '-');
    const newPost = new Post({ title, content, author, slug: slugy, tags });

    newPost.save()
        .then(() => res.status(200).send({ message: 'Successfully created post' }))
        .catch(err => console.error(err));
};

// Read all
exports.findAll = (req, res) => {
    Post.find()
        .then(data => res.send(data))
        .catch(err => res.status(500).send({ message: err.message }));
};

// Delete by ID
exports.delete = (req, res) => {
    const id = req.params.id;
    Post.findByIdAndDelete(id)
        .then(data => {
            if (!data) return res.status(404).send({ message: "Post not found" });
            res.status(200).send({ message: "Post was successfully deleted" });
        });
};

// Update by ID
exports.update = (req, res) => {
    const id = req.params.id;
    const { title, content } = req.body;
    if (!id || !title || !content) {
        return res.status(400).send({ message: "Content is required" });
    }
    Post.findByIdAndUpdate(id, { title, content }, { useFindAndModify: false })
        .then(data => {
            if (!data) return res.status(404).send({ message: `Cannot update Post with id=${id}` });
            res.status(200).send({ message: `Post was successfully updated` });
        })
        .catch(err => console.log(err));
};
