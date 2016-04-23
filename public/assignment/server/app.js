/**
 * Created by kishore on 3/17/16.
 */
"use strict";
module.exports = function(app, db, mongoose, userModel) {
    //var userModel = require("./models/user.model.js")(db, mongoose);
    var formModel = require("./models/form.model.js")(db, mongoose);

    var userService = require("./services/user.service.server.js")(app, userModel);
    var formService = require("./services/form.service.server.js")(app, formModel);
    var fieldService = require("./services/field.service.server.js")(app, formModel);
    var adminService = require("./services/admin.service.server.js")(app, userModel, formModel);
};
