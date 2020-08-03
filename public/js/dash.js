function populateNewSettingModal(settingGroupName, settingGroupId) {
  document.getElementById("newSettingModalTitle").innerHTML =
    "Add New Setting for " + settingGroupName;
  document.getElementById("new-setting-form").action =
    "/dash/groups/add-setting/" + settingGroupId;
}

function populateEditSettingModal(
  settingGroupName,
  settingGroupId,
  settingKey,
  settingValue
) {
  document.getElementById("editSettingModalTitle").innerHTML =
    "Edit " + settingKey + " Setting for " + settingGroupName;
  document.getElementById("editSettingKey").value = settingKey;
  document.getElementById("editSettingKeyOriginal").value = settingKey;
  document.getElementById("editSettingValue").value = settingValue;
  document.getElementById("edit-setting-form").action =
    "/dash/groups/edit-setting/" + settingGroupId;
}

function populateDeleteGroupModal(settingGroupName, settingGroupId) {
  document.getElementById("deleteGroupModalTitle").innerHTML =
    "Are you sure you want to delete the group '" + settingGroupName + "'?";
  document.getElementById("delete-group-form").action =
    "/dash/groups/delete-group/" + settingGroupId;
}

function populateDeleteSettingModal(settingKey, settingGroupId) {
  document.getElementById("deleteSettingModalTitle").innerHTML =
    "Are you sure you want to delete the setting '" + settingKey + "'?";
  document.getElementById("delete-setting-form").action =
    "/dash/groups/delete-setting/" + settingGroupId + "&" + settingKey;
}
