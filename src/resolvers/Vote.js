const link = ({ id }, _, { prisma }) => prisma.vote({ id }).link();

const user = ({ id }, _, { prisma }) => prisma.vote({ id }).user();

module.exports = {
  link,
  user
};
