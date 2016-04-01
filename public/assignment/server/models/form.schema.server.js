/**
 * Created by kishore on 3/31/16.
 */
module.exports=function(mongoose) {
    var fieldSchema = require("./field.schema.server.js")(mongoose);
    var formSchema = mongoose.Schema({
      userId: String,
      title: String,
      fields: [fieldSchema]
  }, {collection: 'form'});
    return formSchema;
};
