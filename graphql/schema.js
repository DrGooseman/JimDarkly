const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type SettingGroup {
        _id: ID!
        groupName: String!
        settings: [Setting]!
    }

    type Setting {
        key: String!
        value: String!
        lastUpdated: String
    }

    type User {
        _id: ID!
        email: String!
        password: String
    }

    type AuthData{
        token: String!
        userId: String!
    }

    input UserInputData {
        email: String!
        password: String!
    }

    input SettingGroupInputData {
        groupName: String!
    }

    input SettingInputData {
        key: String!
        value: String!
    }

    type RootQuery{
        login(email: String!, password: String!): AuthData!
        getUsers: [User]!
        getSettingGroups: [SettingGroup]!
        getSettingGroup(groupName: String!): SettingGroup!
    }

    type RootMutation {
        createUser(userInput: UserInputData): User!
        createSettingGroup(settingGroupInput: SettingGroupInputData): SettingGroup!
        createSetting(settingInput: SettingInputData): Setting!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
