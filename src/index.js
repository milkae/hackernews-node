const { GraphQLServer } = require("graphql-yoga");

let links = [
  {
    id: 0,
    url: "https://graphql.org",
    description: "GraphQL"
  }
];

let idCount = links.length;

const resolvers = {
  Query: {
    info: () => `Hello you`,
    feed: () => links
  },
  Mutation: {
    post: (_, { description, url }) => {
      const link = {
        id: idCount++,
        description,
        url
      };
      links.push(link);
      return link;
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
