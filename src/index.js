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
    feed: () => links,
    link: (_, { id }) => links.find(link => Number(link.id) === Number(id))
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
    },
    updateLink: (_, { id, url, description }) => {
      const link = links.find(link => link.id === id);
      if (!link) {
        return null;
      }
      const updatedLink = {
        ...link,
        description: description || link.description,
        url: url || link.url
      };

      links = [...links.slice(0, id), updatedLink, ...links.slice(id + 1)];

      return updatedLink;
    },
    deleteLink: (_, { id }) => {
      const link = links.find(link => link.id === id);
      if (!link) {
        return null;
      }
      links = [...links.slice(0, id), ...links.slice(id + 1)];
      return link;
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
