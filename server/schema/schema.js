const { projects, clients } = require('../sample.js');
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList } = require('graphql');
const ClientSchema = require('../models/ClientSchema');
const ProjectSchema = require('../models/ProjectSchema');

const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLID },
        name : { type: GraphQLString },
        email : { type: GraphQLString },
        phone : { type: GraphQLString }
    })
});

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        name : { type: GraphQLString },
        description : { type: GraphQLString },
        status : { type: GraphQLString },
        client : {
            type: ClientType,
            resolve(parent, args) {
                return ClientSchema.findById(parent.clientId)
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        projects:{
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                return ProjectSchema.find();
            }
        },
        project: {
            type: ProjectType,
            args: {id: { type: GraphQLID }},
            resolve(parent, args) {
                return ProjectSchema.findbyId(args.id);
            }
        },
        clients:{
            type: new GraphQLList(ClientType),
            resolve(parent, args) {
                return ClientSchema.find();
            }
        },
        client: {
            type: ClientType,
            args: {id: { type: GraphQLID }},
            resolve(parent, args) {
                return ClientSchema.findbyId(args.id);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query : RootQuery
})