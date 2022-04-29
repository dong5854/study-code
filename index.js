import { createServer } from "graphql-yoga";

const server = new createServer({});

server.start(() => console.log("Graphql Server Running"))