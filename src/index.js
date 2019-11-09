const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");

const resolvers = {
  Query: {
    info: () => `Hello you`,
    feed: (_, _1, { prisma }) => prisma.links(),
    link: (_, { id }, { prisma }) => prisma.link({ id })
  },
  Mutation: {
    post: (_, { description, url }, { prisma }) => {
      return prisma.createLink({ url, description });
    },
    updateLink: (_, { id, url, description }, { prisma }) => {
      return prisma.updateLink({
        data: { url, description },
        where: { id: id }
      });
    },
    deleteLink: (_, { id }, { prisma }) => {
      return prisma.deleteLink({ id });
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: { prisma }
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
