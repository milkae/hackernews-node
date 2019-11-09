const postedBy = ({ id }, _, { prisma }) => prisma.link({ id }).postedBy();

module.exports = {
  postedBy
};
