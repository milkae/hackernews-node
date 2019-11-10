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

const post = (_, { description, url }, { request, prisma }) => {
  const userId = getUserId(request);
  return prisma.createLink({
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

const vote = async (_, { linkId }, { request, prisma }) => {
  const userId = getUserId(request);

  const linkExists = await prisma.$exists.vote({
    user: { id: userId },
    link: { id: linkId }
  });

  if (linkExists) {
    throw new Error(`Already votes for link: ${linkId}`);
  }

  return prisma.createVote({
    user: { connect: { id: userId } },
    link: { connect: { id: linkId } }
  });
};

module.exports = {
  signup,
  login,
  post,
  updateLink,
  deleteLink,
  vote
};
