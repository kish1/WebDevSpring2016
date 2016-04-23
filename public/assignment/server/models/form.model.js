/**
 * Created by kishore on 3/17/16.
 */
"use strict";
var q = require('q');
module.exports = function(db, mongoose) {
    var FormSchema = require("./form.schema.server.js")(mongoose);
    //var FieldSchema = require("./field.schema.server.js")(mongoose);
    var FormModel = mongoose.model('Form', FormSchema);
    var api = {
        createFormForUser: createFormForUser,
        findFormById: findFormById,
        findAllFormsForUser: findAllFormsForUser,
        updateFormById: updateFormById,
        deleteFormById: deleteFormById,

        findAllFieldsForForm: findAllFieldsForForm,
        findFieldInForm: findFieldInForm,
        deleteFieldFromForm: deleteFieldFromForm,
        createFieldInForm: createFieldInForm,
        updateFieldInForm: updateFieldInForm,
        updateFieldOrderInForm: updateFieldOrderInForm
    };
    return api;

    function updateFieldOrderInForm(formId, startIndex, endIndex) {
        var deferred = q.defer();
        FormModel
            .findById(formId)
            .then(
                function (form) {
                    if (form) {
                        console.log(form);
                        form.fields.splice(endIndex, 0, form.fields.splice(startIndex, 1)[0]);
                        form.markModified("fields");
                        form.save();
                        console.log("finishes");
                        deferred.resolve();
                    } else {
                        deferred.reject();
                    }

                }
            );
        return deferred.promise;
    }

    function updateFieldInForm(formId, fieldId, field) {
        var newField = {
            _id: field._id,
            label: field.label,
            type: field.type,
            placeholder:field.placeholder,
            options: field.options
        };
        var deferred = q.defer();
        FormModel.findOneAndUpdate({_id: formId, "fields._id": fieldId}, {$set: {"fields.$": newField}}, {new: true}, function (err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(form);
            }
        });
        return deferred.promise;
    }

    function createFieldInForm(formId, field) {
        var newField = {
            label: field.label,
            type: field.type,
            placeholder:field.placeholder,
            options: field.options
        };
        var deferred = q.defer();
        FormModel.findByIdAndUpdate(formId, {$push: {"fields" : newField}}, {new: true}, function (err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(form);
            }
        });
        return deferred.promise;
    }

    function deleteFieldFromForm(formId, fieldId) {
        var deferred = q.defer();
        FormModel.update({_id: formId}, {$pull: {"fields": {_id: fieldId}}}, function (err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(form);
            }
        });
        return deferred.promise;
    }

    function findFieldInForm(formId, fieldId) {
        var deferred = q.defer();
        FormModel.findOne({_id: formId, "fields._id": fieldId}, {"fields.$" : 1}, function (err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(form);
            }
        });
        return deferred.promise;
    }

    function findAllFieldsForForm(formId) {
        var deferred = q.defer();
        FormModel.findById(formId, 'fields', function (err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(form);
            }
        });
        return deferred.promise;
    }

    function createFormForUser(userId, form) {
        var newForm = {
            userId: userId,
            title: form.title,
            fields: form.fields
        };
        var deferred = q.defer();
        FormModel.create(newForm, function (err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(form);
            }
        });
        return deferred.promise;
    }

    function findFormById(formId) {
        var deferred = q.defer();
        FormModel.findById(formId, function (err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(form);
            }
        });
        return deferred.promise;
    }

    function updateFormById(formId, form) {
        var newForm = {
            userId: form.userId,
            title: form.title,
            fields: form.fields
        };
        var deferred = q.defer();
        FormModel.findByIdAndUpdate(formId, newForm, {new: true}, function (err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(form);
            }
        });
        return deferred.promise;
    }

    function deleteFormById(formId) {
        var deferred = q.defer();
        FormModel.findByIdAndRemove(formId, function (err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(form);
            }
        });
        return deferred.promise;
    }

    function findAllFormsForUser(userId) {
        var deferred = q.defer();
        FormModel.findById(userId, function (err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(form);
            }
        });
        return deferred.promise;
    }

}