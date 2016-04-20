/**
 * Created by kishore on 4/20/16.
 */
module.exports = function (mongoose) {
    var contentPartSchema = mongoose.Schema({
        type: String,
        value: String
    }, {collection: "project.contentPart"});
    return contentPartSchema;
}
