/**
 * Created by kishore on 4/19/16.
 */
module.exports = function (mongoose) {
    var postSchema = mongoose.Schema({
        userId: Schema.ObjectId,
        name: String,
        createdOn: Date,
        tags: [String],
        content: [{type: String, value: String}],
        starrers: [Schema.ObjectId]
    }, {collection: 'project.post'});
    return postSchema;
}