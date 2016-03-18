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
        var forms = formModel.findAllFormsForUser(userId);
        res.json(forms);
    }

    function findFormById(req, res) {
        var formId = req.params.formId;
        var form = formModel.findFormById(formId);
        res.json(form);
    }

    function deleteFormById(req, res) {
        var formId = req.params.formId;
        var forms = formModel.deleteFormById(formId);
        res.json(forms);
    }

    function createFormForUser(req, res) {
        var userId = req.params.userId;
        var form = req.body;
        form = formModel.createFormForUser(userId, form);
        res.json(form);
    }

    function updateFormById(req, res) {
        var formId = req.params.formId;
        var form = req.body;
        form = formModel.updateFormById(formId, form);
        res.json(form);
    }
};
