const PostService = require('../services/post_service');


const getPosts = async (req, res) => {
    try {

        const result = await PostService.getPosts();
        res.status(201).json({result});
    } catch (e) {
        res.status(500).json({ 'Post Error': e.message });
    }
}


module.exports = { getPosts };
