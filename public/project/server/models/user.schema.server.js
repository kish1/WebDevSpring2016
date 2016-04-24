/**
 * Created by kishore on 4/19/16.
 */
module.exports = function (mongoose) {
    var userSchema = mongoose.Schema({
        handle: {type: String, unique: true},
        displayPicture: String,
        firstName: String,
        lastName: String,
        email: String,
        password: String,
        dob: Date,
        gender:{
            type: String,
            enum: ['male', 'female']
        },
        description: String,
        followers: [mongoose.Schema.ObjectId],
        following: [mongoose.Schema.ObjectId],
        starred: [mongoose.Schema.ObjectId],
        followersCount: Number,
        followingCount: Number,
        starredCount: Number,
        isAdmin: Boolean
    }, {collection: 'project.user'});
    return userSchema;
}
