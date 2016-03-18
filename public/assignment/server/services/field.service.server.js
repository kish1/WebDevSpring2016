/**
 * Created by kishore on 3/17/16.
 */
"use strict";
module.exports = function (app, formModel) {
    app.get("/api/assignment/form/:formId/field", findAllFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldInForm);
    app.delete(" /api/assignment/form/:formId/field/:fieldId", deleteFieldInForm);
    app.post("/api/assignment/form/:formId/field", createFieldInForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldInForm);

    function updateFieldInForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = formModel.updateFieldInForm(formId, fieldId);
        res.json(field);
    }

    function createFieldInForm(req, res) {
        var formId = req.params.formId;
        var field = formModel.createFieldInForm(formId);
        res.json(field);
    }

    function deleteFieldInForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var fields = formModel.deleteFieldInForm(formId, fieldId);
        res.json(fields);
    }

    function findFieldInForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = formModel.findFieldInForm(formId, fieldId);
        res.json(field);
    }

    function findAllFieldsForForm(req, res) {
        var formId = req.params.formId;
        var fields = formModel.findAllFieldsForForm(formId);
        res.json(fields);
    }


};
