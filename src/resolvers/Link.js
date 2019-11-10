const postedBy = ({ id }, _, { prisma }) => prisma.link({ id }).postedBy();

const votes = ({ id }, _, { prisma }) => prisma.link({ id }).votes();

module.exports = {
  postedBy,
  votes
};
