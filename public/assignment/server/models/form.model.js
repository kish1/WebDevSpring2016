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
        updateFieldInForm: updateFieldInForm
    };
    return api;

    function updateFieldInForm(formId, fieldId, field) {
        for(var i in mock) {
            if (mock[i]._id == formId) {
                for(var j in mock[i].fields) {
                    if (mock[i].fields[j]._id == fieldId) {
                        mock[i].fields[j].label = field.label;
                        mock[i].fields[j].placeholder = field.placeholder;
                        mock[i].fields[j].options = field.options;
                        return mock[i].fields[j];
                    }
                }
            }
        }
    }

    function createFieldInForm(formId, field) {
        field._id = uuid.v1();
        for(var i in mock) {
            if (mock[i]._id == formId) {
                mock[i].fields.push(field);
                return mock[i];
            }
        }
        return null;
    }

    function deleteFieldFromForm(formId, fieldId) {
        var deleted = false;
        for(var i in mock) {
            if (mock[i]._id == formId) {
                for(var j in mock[i].fields) {
                    if (mock[i].fields[j]._id == fieldId) {
                        mock[i].fields.splice(j, 1);
                        deleted = true;
                        break;
                    }
                }
            }
            if (deleted) {
                break;
            }
        }
        return mock[i].fields;
    }

    function findFieldInForm(formId, fieldId) {
        for(var i in mock) {
            if (mock[i]._id == formId) {
                for(var j in mock[i].fields) {
                    if (mock[i].fields[j]._id == fieldId) {
                        return mock[i].fields[j];
                    }
                }
            }
        }
        return null;
    }

    function findAllFieldsForForm(formId) {
        for(var i in mock) {
            if (mock[i]._id == formId) {
                return mock[i].fields;
            }
        }
        return [];
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
        FormModel.find({}, function (err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(form);
            }
        });
        return deferred.promise;
    }

}