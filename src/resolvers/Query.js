const feed = async (_, { filter, skip, first, orderBy }, { prisma }) => {
  const where = filter
    ? { OR: [{ description_contains: filter }, { url_contains: filter }] }
    : {};
  const links = await prisma.links({ where, skip, first, orderBy });

  const count = await prisma
    .linksConnection({ where })
    .aggregate()
    .count();

  return { links, count };
};

const link = (_, { id }, { prisma }) => prisma.link({ id });

const users = (_, _1, { prisma }) => prisma.users();

module.exports = {
  feed,
  link,
  users
};
