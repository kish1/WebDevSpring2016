/**
 * Created by kishore on 4/19/16.
 */
module.exports = function (mongoose) {
    var contentPartSchema = require("./contentPart.schema.server.js")(mongoose);
    var postSchema = mongoose.Schema({
        userId: mongoose.Schema.ObjectId,
        name: String,
        createdOn: Date,
        tags: [String],
        //content: [{type: String, value: String}],
        content:[{type: mongoose.Schema.Types.Object, ref:"project.contentPart"}],
        starrers: [mongoose.Schema.ObjectId],
        starrersCount: Number
    }, {collection: 'project.post'});
    return postSchema;
}