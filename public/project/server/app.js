/**
 * Created by kishore on 3/23/16.
 */
"use strict";
module.exports = function(app) {
    var userModel = require("./models/user.model.js")();
    var postModel = require("./models/post.model.js")();

    var userService = require("./services/user.service.server.js")(app, userModel);
    var postService = require("./services/post.service.server.js")(app, postModel);
};
