const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const SettingGroup = require("../models/setting-group");
const HttpError = require("../models/http-error");

module.exports = {
  createUser: async function ({ userInput }, req) {
    const existingUser = await User.findOne({ email: userInput.email });

    if (existingUser) throw new HttpError("User exists already!", 409);

    const hashedPw = await bcrypt.hash(userInput.password, 12);
    const user = new User({
      email: userInput.email,
      name: userInput.name,
      password: hashedPw,
    });
    const createdUser = await user.save();

    return {
      ...createdUser._doc,
      _id: createdUser._id.toString(),
    };
  },
  login: async function ({ email, password }, req) {
    const user = await User.findOne({ email });
    if (!user) throw new HttpError("User not found!", 401);

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) throw new HttpError("Password is incorrect!", 401);
    const token = jwt.sign(
      {
        userId: user._id.toString(),
        email: user.email,
      },
      process.env.SECRET,
      { expiresIn: "1h" }
    );
    return { token, userId: user._id.toString() };
  },
  getUsers: async function (req) {
    const users = await User.find();
    console.log(users);
    return users;
  },
  createSettingGroup: async function ({ settingGroupInput }, req) {
    // if (!req.isAuth) throw new HttpError("Not Authenticated!", 401);

    //const user = await User.findById(req.userId);
    //  if (!user) throw new HttpError("Invalid user!", 401);

    const settingGroup = new SettingGroup({
      groupName: settingGroupInput.groupName,
      settings: [],
    });
    let createdSettingGroup;
    try {
      createdSettingGroup = await settingGroup.save();
    } catch (err) {
      throw new HttpError("Could not create new group.", 500);
    }

    return {
      ...createdSettingGroup._doc,
      _id: createdSettingGroup._id.toString(),
    };
  },
  getSettingGroup: async function ({ groupName }, req) {
    // if (!req.isAuth) throw new HttpError("Not Authenticated!", 401);

    //const user = await User.findById(req.userId);
    //  if (!user) throw new HttpError("Invalid user!", 401);

    const settingGroup = await SettingGroup.findOne({ groupName });

    if (!settingGroup) throw new HttpError("No group found.", 404);

    return {
      ...settingGroup._doc,
      _id: settingGroup._id.toString(),
    };
  },
};
