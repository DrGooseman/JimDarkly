const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const settingGroupSchema = new Schema({
  groupName: {
    type: String,
    required: true,
    unique: true,
  },
  settings: [
    {
      key: {
        type: String,
        required: true,
      },
      value: {
        type: String,
        required: true,
      },
      lastUpdated: Date,
    },
  ],
});

module.exports = mongoose.model("SettingGroup", settingGroupSchema);
