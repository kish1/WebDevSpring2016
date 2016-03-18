/**
 * Created by kishore on 3/17/16.
 */
"use strict";
module.exports = function(app) {
    var userModel = require("./models/user.model.js")();
    var formModel = require("./models/form.model.js")();
    var userService = require("./services/user.service.server.js")(app, userModel);
    var formService = require("./services/form.service.server.js")(app, formModel);
};
