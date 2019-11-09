const feed = async (_, { filter }, { prisma }) => {
  const where = filter
    ? { OR: [{ description_contains: filter }, { url_contains: filter }] }
    : {};
  const links = await prisma.links({ where });
  return links;
};

const link = (_, { id }, { prisma }) => prisma.link({ id });

module.exports = {
  feed,
  link
};
