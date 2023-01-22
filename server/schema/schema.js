const { projects, clients } = require("../sampleData");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
} = require("graphql");

// Client Type
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    //Returning a Object-Type
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

// Project Type
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    //Returning a Object-Type
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    // Adding Clients
    client: {
        type: ClientType,
        resolve(parent, args){
            return clients.find(client => client.id === parent.clientId)
        }
    }
  }),
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // ======= Clients ========
    //Getting All Clients
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return clients;
      },
    },
    //Getting Single Client
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } }, //For passing in arguments in GraphQL
      resolve(parent, args) {
        return clients.find((client) => client.id === args.id);
      },
    },

    // ======= Projects ========
    //Getting All Clients
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return projects;
      },
    },
    //Getting Single Client
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } }, //For passing in arguments in GraphQL
      resolve(parent, args) {
        return projects.find((project) => project.id === args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
