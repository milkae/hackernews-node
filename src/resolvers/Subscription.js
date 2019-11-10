const newLinkSubscribe = (_, _1, { prisma }) =>
  prisma.$subscribe.link({ mutation_in: ["CREATED"] }).node();

const newLink = {
  subscribe: newLinkSubscribe,
  resolve: payload => payload
};

const newVoteSubscribe = (_, _1, { prisma }) =>
  prisma.$subscribe.vote({ mutation_in: ["CREATED"] }).node();

const newVote = {
  subscribe: newVoteSubscribe,
  resolve: payload => payload
};

module.exports = {
  newLink,
  newVote
};
