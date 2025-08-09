const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title:   { type: String, required: true },
  user_id:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Post', postSchema);



// const Post = require('./models/post');
// const Comment = require('./models/comment');
// const createPostWithComment = async () => {
//   const post = await Post.create({
//     title: 'First Post',
//     user_id: '687dd5c6e8eb849358944204'
//   });
//   const comment = await Comment.create({
//     text: 'First post comment',
//     post_id: post._id
//   });

//   return { post, comment };
// };

// app.post('/api/post', async (req, res) => {
//   try {
//     const { post, comment } = await createPostWithComment();
//     res.status(201).json({
//       message: 'Post and comment created successfully',
//       post,
//       comment
//     });
    
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });



// const Post = require('./models/post');
// const Comment = require('./models/comment');
// const mongoose = require('mongoose');
// app.post('/api/postlist', async(req,res)=>{
//   const userId = '687dd533e8eb8493589441ec';
//    const result = await Post.aggregate([
//       {
//         $match: {
//           user_id: new mongoose.Types.ObjectId(userId)
//         }
//       },
//       {
//         $lookup: {
//           from: 'users',
//           localField: 'user_id',
//           foreignField: '_id',
//           as: 'user'
//         }
//       },
//       { $unwind: '$user' },
//        {
//         $lookup: {
//           from: 'comments',             
//           localField: '_id',            
//           foreignField: 'post_id',     
//           as: 'comments'            
//         }
//       },
//       {
//         $project: {
//           title: 1,
//           _id: 1,
//           user_id: 1,
//           username: '$user.name', // pull and rename from joined user
//           email: '$user.email',
//           createdAt: 1,
//           comments: 1
//         }
//       }
//     ]);

//     res.json(result);
// })