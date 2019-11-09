const feed = (_, _1, { prisma }) => prisma.links();

const link = (_, { id }, { prisma }) => prisma.link({ id });

module.exports = {
  feed,
  link
};
