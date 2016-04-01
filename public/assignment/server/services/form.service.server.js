/**
 * Created by kishore on 3/17/16.
 */
"use strict";
module.exports = function(app, formModel) {
    app.get("/api/assignment/user/:userId/form", findAllFormsForUser);
    app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.put("/api/assignment/form/:formId", updateFormById);

    function findAllFormsForUser(req, res) {
        var userId = req.params.userId;
        formModel.findAllFormsForUser(userId)
            .then(function (forms) {
                res.json(forms);
            },
            function (err) {
                res.status(400).send(err);
            });
    }

    function findFormById(req, res) {
        var formId = req.params.formId;
        formModel.findFormById(formId)
            .then(function (form) {
                res.json(form);
            },
            function (err) {
                res.status(400).send(err);
            });
    }

    function deleteFormById(req, res) {
        var formId = req.params.formId;
        formModel.deleteFormById(formId)
            .then(function (form) {
                res.json(form);
            },
            function (err) {
                res.status(400).send(err);
            });
    }

    function createFormForUser(req, res) {
        var userId = req.params.userId;
        var form = req.body;
        formModel.createFormForUser(userId, form)
            .then(function (form) {
                res.json(form);
            },
            function (err) {
                res.status(400).send(err);
            });
    }

    function updateFormById(req, res) {
        var formId = req.params.formId;
        var form = req.body;
        formModel.updateFormById(formId, form)
            .then(function (form) {
                res.json(form);
            },
            function (err) {
                res.status(400).send(err);
            });
    }
};
