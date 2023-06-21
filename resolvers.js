// import { users, quotes } from "./fakedb.js";
// import { randomBytes } from "crypto";
import User from "./models/User.js";
import Quotes from "./models/Quotes.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import { JWT_SECRET } from "./config.js";

const resolvers = {
  Query: {
    users: async () => await User.find({}),
    user: async (_, { _id }) => await User.findOne({ _id }),
    quotes: async () => await Quotes.find({}),
    singlequote: async (_, { by }) => await Quotes.find({ by }),
    myprofile: async (_, args, { userId }) => {
      if (!userId) {
        throw new Error("You must be loggedin");
      }
      return await User.findOne({ _id: userId });
    },
  },
  User: {
    quotes: async (ur) => await Quotes.find({ by: ur._id }),
  },
  Mutation: {
    signupUser: async (_, { userNew }) => {
      const user = await User.findOne({ email: userNew.email });
      if (user) {
        throw new Error("user already exist with that email");
      }
      const hashPassword = await bcrypt.hash(userNew.password, 12);

      const newUser = new User({
        ...userNew,
        password: hashPassword,
      });

      return await newUser.save();
    },

    signinUser: async (_, { userSignin }) => {
      const user = await User.findOne({ email: userSignin.email });
      if (!user) {
        throw new Error("User doesn't exist with that email");
      }
      const matchPass = await bcrypt.compare(
        userSignin.password,
        user.password
      );
      if (!matchPass) {
        throw new Error("email or password is invalid");
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      return { token };
    },

    createQuote: async (_, { name }, { userId }) => {
      if (!userId) {
        throw new Error("You must be loggedin");
      }
      const quote = new Quotes({
        name,
        by: userId,
      });
      await quote.save();
      return `Quote saved successfully`;
    },
  },
};

export default resolvers;
