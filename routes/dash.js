const express = require("express");

const router = express.Router();

const SettingGroup = require("../models/setting-group");
const HttpError = require("../models/http-error");
const settingGroup = require("../models/setting-group");

router.get("/", async (req, res, next) => {
  res.redirect("/dash/groups/");
});

router.get("/groups/", async (req, res, next) => {
  const settingGroups = await SettingGroup.find();

  res.render("dash", {
    pageTitle: "Dashboard",
    path: "/dash/groups/",
    settingGroups,
  });
});

router.post("/groups/add-group", async (req, res, next) => {
  const groupName = req.body.groupName;
  if (!groupName || groupName === "")
    return next(new HttpError("Group Name cannot be empty!", 422));

  const settingGroup = new SettingGroup({
    groupName,
    settings: [],
  });
  let createdSettingGroup;
  try {
    createdSettingGroup = await settingGroup.save();
  } catch (err) {
    return next(
      new HttpError("Could not create new group. " + err.message, 500)
    );
  }

  res.redirect("/dash/groups/");
});

router.post("/groups/add-setting/:groupId", async (req, res, next) => {
  const groupId = req.params.groupId;
  const { settingKey, settingValue } = req.body;
  if (!groupId || groupId === "")
    return next(new HttpError("Group Name cannot be empty!", 422));

  const settingGroup = await SettingGroup.findById(groupId);
  if (!settingGroup) return next(new HttpError("Group does not exist", 422));

  const alreadyContainsKey = settingGroup.settings.some(
    (setting) => setting.key === settingKey
  );

  if (alreadyContainsKey)
    return next(new HttpError("Setting with key already exists.", 422));

  settingGroup.settings.push({
    key: settingKey,
    value: settingValue,
    lastUpdated: new Date(),
  });
  try {
    createdSettingGroup = await settingGroup.save();
  } catch (err) {
    return next(
      new HttpError("Could not create new group. " + err.message, 500)
    );
  }

  res.redirect("/dash/groups/");
});

router.post("/groups/edit-setting/:groupId", async (req, res, next) => {
  const groupId = req.params.groupId;
  const { settingKeyOriginal, settingKey, settingValue } = req.body;
  if (!groupId || groupId === "")
    return next(new HttpError("Group Name cannot be empty!", 422));

  const settingGroup = await SettingGroup.findById(groupId);
  if (!settingGroup) return next(new HttpError("Group does not exist", 422));

  if (settingKey !== settingKeyOriginal) {
    const alreadyContainsKey = settingGroup.settings.some(
      (setting) => setting.key === settingKey
    );
    if (alreadyContainsKey)
      return next(new HttpError("Setting with key already exists.", 422));
  }

  const setting = settingGroup.settings.find(
    (set) => set.key === settingKeyOriginal
  );
  if (!setting) return next(new HttpError("Setting not found!", 422));

  setting.key = settingKey;
  setting.value = settingValue;
  setting.lastUpdated = new Date();

  try {
    await settingGroup.save();
  } catch (err) {
    return next(
      new HttpError("Could not edit the setting. " + err.message, 500)
    );
  }

  res.redirect("/dash/groups/");
});

router.post("/groups/delete-group/:groupId", async (req, res, next) => {
  const groupId = req.params.groupId;

  if (!groupId || groupId === "")
    return next(new HttpError("Group Name cannot be empty!", 422));

  try {
    await SettingGroup.findByIdAndDelete(groupId);
  } catch (err) {
    return next(new HttpError("Could not delete group. " + err.message, 500));
  }

  res.redirect("/dash/groups/");
});

router.post(
  "/groups/delete-setting/:groupId&:settingKey",
  async (req, res, next) => {
    const { groupId, settingKey } = req.params;

    if (!groupId || groupId === "")
      return next(new HttpError("Group Id cannot be empty!", 422));

    const settingGroup = await SettingGroup.findById(groupId);
    if (!settingGroup) return next(new HttpError("Group does not exist", 422));

    settingGroup.settings = settingGroup.settings.filter(
      (setting) => setting.key !== settingKey
    );

    try {
      await settingGroup.save();
    } catch (err) {
      return next(new HttpError("Could not delete group. " + err.message, 500));
    }

    res.redirect("/dash/groups/");
  }
);

module.exports = router;
