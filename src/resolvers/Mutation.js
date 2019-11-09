const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, getUserId } = require("../utils");

const signup = async (_, args, { prisma }) => {
  const password = await bcrypt.hash(args.password, 10);
  const user = await prisma.createUser({ ...args, password });
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user
  };
};

const login = async (_, { email, password }, { prisma }) => {
  const user = await prisma.user({ email });
  if (!user) {
    throw new Error(`No such user found`);
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user
  };
};

const post = (_, { description, url }, context) => {
  const userId = getUserId(context);
  return context.prisma.createLink({
    url,
    description,
    postedBy: { connect: { id: userId } }
  });
};

const updateLink = (_, { id, url, description }, { prisma }) => {
  // TODO handle authorization
  return prisma.updateLink({
    data: { url, description },
    where: { id: id }
  });
};

const deleteLink = (_, { id }, { prisma }) => {
  // TODO handle authorization
  return prisma.deleteLink({ id });
};

module.exports = {
  signup,
  login,
  post,
  updateLink,
  deleteLink
};
