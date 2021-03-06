/**
 * Created by kishore on 3/23/16.
 */
"use strict";

var multer = require("multer");
var dpDestination = process.env.IMAGES_ROOT + '/images/dp';
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, dpDestination)
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        var imageName = (req.params.id + '-' + datetimestamp + '-' + file.originalname).split(/\W+/);
        var extension = imageName[imageName.length-1];
        imageName = imageName.slice(0, imageName.length-1);
        imageName.push("." + extension);
        imageName = imageName.join("").toLowerCase();
        console.log(imageName);
        req.imageName = imageName;
        cb(null, imageName);
    }
});
var dpUpload = multer({storage: storage});

module.exports = function (app, userModel) {
    var auth = authorized;

    app.get("/api/project/user/handle/:handle", findUserByHandle);
    app.get("/api/project/user/all", auth, findAllUsers);
    app.post("/api/project/user/credentials", findUserByCredentials);
    app.get("/api/project/user/:id", findUserById);
    app.get("/api/project/user/name/:id", findNameByUserId);
    app.post("/api/project/user", auth, createUser);
    app.put("/api/project/user/:id", auth, updateUserById);
    app.delete("/api/project/user/:id", auth, deleteUserById);
    app.put("/api/project/user/:id/dp", auth, dpUpload.single("displayPicture"), updateDisplayPictureById);

    function updateDisplayPictureById(req, res) {
        var userId = req.params.id;
        userModel
            .updateDisplayPictureById(userId, req.imageName)
            .then(
                function (resp) {
                    res.json(resp);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findNameByUserId(req, res) {
        var userId = req.params.id;
        userModel
            .findUserById(userId)
            .then(
                function (resp) {
                    var user = resp;
                    res.json({
                        _id: user._id,
                        displayPicture: user.displayPicture,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        handle: user.handle
                    });
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserByHandle(req, res) {
        var handle = req.params.handle;
        userModel
            .findUserByHandle(handle)
            .then(
                function (resp) {
                    res.json(resp);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserById(req, res) {
        var userId = req.params.id;
        userModel
            .findUserById(userId)
            .then(
                function (resp) {
                    res.json(resp);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteUserById(req, res) {
        if(isAdmin(req.user)) {
            var userId = req.params.id;
            userModel
                .deleteUserById(userId)
                .then(
                    function (resp) {
                        res.json(resp);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }

    function updateUserById(req, res) {
        var userId = req.params.id;
        var user = req.body;
        userModel
            .updateUserById(userId, user)
            .then(
                function (resp) {
                    res.json(resp);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createUser(req, res) {
        if (isAdmin(req.user)) {
            var user = req.body;
            userModel
                .createUser(user)
                .then(
                    function (resp) {
                        res.json(resp);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }
/*
    function userResolve(req, res) {
        if (req.query.handle == null && req.query.password == null) {
            findAllUsers(req, res);
        } else if (req.query.handle != null && req.query.password != null) {
            findUserByCredentials(req, res);
        } else {
            res.status(400).send("can't resolve");
        }
    }
*/
    function findUserByCredentials(req, res) {
        var credentials = {
            handle: req.body.handle,
            password: req.body.password
        };
        userModel
            .findUserByCredentials(credentials)
            .then(
                function (resp) {
                    res.json(resp);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllUsers(req, res) {
        if (isAdmin(req.user)) {
            userModel
                .findAllUsers()
                .then(
                    function (resp) {
                        console.log(resp);
                        res.json(resp);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }

    function isAdmin(user) {
        if(user.isAdmin) {
            return true
        }
        return false;
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }
};