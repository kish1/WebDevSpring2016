/**
 * Created by kishore on 3/17/16.
 */
"use strict";
module.exports = function (app, formModel) {
    app.get("/api/assignment/form/:formId/field", findAllFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldInForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldInForm);
    app.post("/api/assignment/form/:formId/field", createFieldInForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldInForm);
    app.put("/api/assignment/form/:formId/field", updateFieldOrderInForm);

    function updateFieldOrderInForm(req, res) {
        console.log("reaches");
        var formId = req.params.formId;
        var start = req.query.start;
        var end = req.query.end;
        console.log(formId);
        formModel
            .updateFieldOrderInForm(formId, start, end)
            .then(
                function (resp) {
                    res.send(200);
                },
                function (err) {
                    console.log("error");
                    res.status(400).send(err);
                }
            );
    }

    function updateFieldInForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        formModel.updateFieldInForm(formId, fieldId, field)
            .then(function (form) {
                //console.log('udate');
                //console.log(form);
                res.json(form.fields);
            },
            function (err) {
                res.status(400).send(err);
            });

    }

    function createFieldInForm(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        formModel.createFieldInForm(formId, field)
            .then(function (form) {
                //console.log('create');
                res.json(form.fields);
                //console.log(form);
            },
            function (err) {
                res.status(400).send(err);
            });
    }

    function deleteFieldInForm(req, res) {

        var formId = req.params.formId;
        var fieldId = req.params.fieldId;

        formModel.deleteFieldFromForm(formId, fieldId)
            .then(function (resp) {
                res.json(resp);
            },
            function (err) {
                res.status(400).send(err);
            });
    }

    function findFieldInForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        formModel.findFieldInForm(formId, fieldId)
            .then(function (form) {
                //conosle.log('field');
                //console.log(form);
                res.json(form.fields[0]);
            },
            function (err) {
                res.status(400).send(err);
            });
    }

    function findAllFieldsForForm(req, res) {
        var formId = req.params.formId;
        formModel.findAllFieldsForForm(formId)
            .then(function (fields) {
                //console.log('all');
                //console.log(fields);
                res.json(fields);
            },
            function (err) {
                res.status(400).send(err);
            });
    }

};
