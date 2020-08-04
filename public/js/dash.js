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

function populateGraphqlModal(groupName) {
  document.getElementById("graphqlModalTitle").innerHTML =
    "GraphQL Query for '" + groupName + "'";
  document.getElementById("graphqlModalBody").innerHTML = `query{<br>
    \u00A0\u00A0\u00A0\u00A0getSettingGroup(groupName:"${groupName}"){<br>
    \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0groupName<br>
    \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0settings{<br>
        \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0key<br>
        \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0value<br>
          \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0}<br>
          \u00A0\u00A0\u00A0\u00A0}<br>
    }`;
}
