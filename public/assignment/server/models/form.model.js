/**
 * Created by kishore on 3/17/16.
 */
"use strict";
var uuid = require('node-uuid');
var mock = require("./form.mock.json");
module.exports = function() {
    var api = {
        createFormForUser: createFormForUser,
        findFormById: findFormById,
        findAllFormsForUser: findAllFormsForUser,
        updateFormById: updateFormById,
        deleteFormById: deleteFormById
    };
    return api;

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