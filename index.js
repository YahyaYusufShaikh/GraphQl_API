const express = require("express")
const {graphqlHTTP} = require("express-graphql");
const { GraphQLObjectType, GraphQLID, GraphQLString } = require("graphql");
const app = express();

const userType = new GraphQLObjectType({
    name: "userType",
    fields: ()=>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {}
})

app.use("/graphql", graphqlHTTP({schema:{}, graphiql: true}))

app.listen(5000, ()=>console.log("server started"))
