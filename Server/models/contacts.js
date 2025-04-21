const mongoose = require("mongoose");

const contactsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    mail: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

contactsSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Contact", contactsSchema);
