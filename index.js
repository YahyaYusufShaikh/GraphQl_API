const express = require("express")
const {graphqlHTTP} = require("express-graphql");
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = require("graphql");
const app = express();

const UsersList = [
    {id: "1", name: "Yahya", email: "yahya@gmail.com"},
    {id: "2", name: "Obaid", email: "obaida@gmail.com"},
    {id: "3", name: "hamza", email: "hamza@gmail.com"}
]

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
    fields: {
        //to get all users
        users:{
            type: GraphQLList(userType),
            resolve(){
                return UsersList;
            }
        }
    }
})

app.use("/graphql", graphqlHTTP({schema:{}, graphiql: true}))

app.listen(5000, ()=>console.log("server started"))
