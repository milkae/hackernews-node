const newLinkSubscribe = (_, _1, { prisma }) =>
  prisma.$subscribe.link({ mutation_in: ["CREATED"] }).node();

const newLink = {
  subscribe: newLinkSubscribe,
  resolve: payload => payload
};

module.exports = {
  newLink
};
