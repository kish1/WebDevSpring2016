/**
 * Created by kishore on 3/31/16.
 */
module.exports = function(mongoose) {
    var fieldSchema = mongoose.Schema({
        label: String,
        type: String,
        placeholder: String,
        options: [{label: String, value: String, _id: false}]
    });
    return fieldSchema;
};
