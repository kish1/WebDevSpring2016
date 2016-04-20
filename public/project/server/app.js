/**
 * Created by kishore on 3/23/16.
 */
"use strict";
module.exports = function(app, db, mongoose, userModel) {
    //var userModel = require("./models/user.model.js")(db, mongoose);
    var postModel = require("./models/post.model.js")(db, mongoose);
    var commentModel = require("./models/comment.model.js")(db, mongoose);

    var userService = require("./services/user.service.server.js")(app, userModel);
    var postService = require("./services/post.service.server.js")(app, postModel);
    var commentService = require("./services/comment.service.server.js")(app, commentModel);
    var followService = require("./services/follow.service.server.js")(app, userModel);
    var starService = require("./services/star.service.server.js")(app, userModel, postModel);
};
