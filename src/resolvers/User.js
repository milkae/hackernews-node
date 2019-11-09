const links = ({ id }, _, { prisma }) => prisma.user({ id }).links();

module.exports = {
  links
};
