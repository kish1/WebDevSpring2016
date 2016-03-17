/**
 * Created by kishore on 3/17/16.
 */
"use strict";
module.exports = function(app) {
    var service = require("./services/user.service.server.js")(app);
};
