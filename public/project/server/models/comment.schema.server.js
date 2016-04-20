/**
 * Created by kishore on 4/19/16.
 */
module.exports = function (mongoose) {
    var commentSchema = mongoose.Schema({
        userId: mongoose.Schema.ObjectId,
        postId: mongoose.Schema.ObjectId,
        timestamp: {type: Date, default:Date.now},
        content: String

    }, {collection: 'project.comment'});
    return commentSchema;
}
