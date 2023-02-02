const { projects, clients } = require("../sampleData");
// Mongoose models
const Project = require('../models/Project')
const Client = require('../models/Client')

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
            // return clients.find(client => client.id === parent.clientId) //Testing with sampleData.js
            return Client.findById(parent.clientId)
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
        // return clients; //Testing with sampleData.js
        return Client.find(); //Via MongoDB
      },
    },
    //Getting Single Client
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } }, //For passing in arguments in GraphQL
      resolve(parent, args) {
        // return clients.find((client) => client.id === args.id); //Testing with sampleData.js
        return Client.findById(args.id)
      },
    },

    // ======= Projects ========
    //Getting All Projects
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        //return projects; //Testing with sampleData.js
        return Project.find()
      },
    },
    //Getting Single Client
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } }, //For passing in arguments in GraphQL
      resolve(parent, args) {
        // return projects.find((project) => project.id === args.id); //Testing with sampleData.js
        return Project.findById(args.id)
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
