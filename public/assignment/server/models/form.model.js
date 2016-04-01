/**
 * Created by kishore on 3/17/16.
 */
"use strict";
var q = require('q');
module.exports = function() {
    var FormSchema = require("./form.schema.server.js")(mongoose);
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
        form._id = uuid.v1();
        form.userId = userId;
        mock.push(form);
        return form;
    }

    function findFormById(formId) {
        for(var i in mock) {
            if (mock[i]._id == formId) {
                return mock[i];
            }
        }
        return null;
    }

    function updateFormById(formId, form) {
        for (var i in mock) {
            if (mock[i]._id == formId) {
                mock[i].title = form.title;
                mock[i].userId = form.userId;
                mock[i].fields = mock[i].fields;
                return mock[i];
            }
        }
        return null;
    }

    function deleteFormById(formId) {
        for(var i in mock) {
            if (mock[i]._id == formId) {
                mock.splice(i, 1);
                break;
            }
        }
        return mock;
    }

    function findAllFormsForUser(userId) {
        var forms = [];
        for(var i in mock) {
            if (mock[i].userId == userId) {
                forms.push(mock[i]);
            }
        }
        return forms;
    }

}