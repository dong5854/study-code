import { createServer } from "graphql-yoga";
import resolvers from "./graphql/resolvers";

const typeDefs = `
        type Query {
        name: String!
        }
    `

const server = createServer({
    schema: {
    typeDefs,
    resolvers
    },
})

server.start(() => console.log("Graphql Server Running")); 