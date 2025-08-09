const Post = require('../models/post_model');
const Comment = require('../models/comment_model');
const mongoose = require('mongoose');

const getPosts = async () => {
    try {
        const result = await Post.aggregate([
            //where condition
            // {
            //     $match:{ isPublished: true }
            // },

// count only direct
            // { $count:'testcount' } 
            // data with count 
            // {
            //     $facet:{
            //         data:[{
            //             $sort:{ _id: -1}
            //         }],
            //         total_count:[{
            //             $count:'count'
            //         }]
            //     }
            // }

            //where condition < and >
            // {
            //     $match:{
            //        likes:{ $gt:100, $lt: 1000}
            //     }
            // }

            // group by
            // {
            //     $group:{
            //         _id:'$category',
            //         totalPosts: { 
            //             $sum: 1 
            //         },
            //         posts:{
            //         $push:'$$ROOT'
            //         }
            //     }
            // },
            // {
            //     $sort: { totalPosts: 1 } 
            // }
            //limit and skip
            //  { $skip: 1 },
            //  { $limit: 5 }

            // select the specific fields
            //  {
            //     $project: {
            //     _id: 0,
            //     category: 1,
            //     views: 1
            //     }
            // }

        ]);
        return result;
    } catch (err) {
        throw new Error('Error list user: ' + err.message);
    }
};
module.exports = { getPosts };
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