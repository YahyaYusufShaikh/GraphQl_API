const express = require("express")
const {graphqlHTTP} = require("express-graphql");
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLSchema } = require("graphql");
const app = express();

let UsersList = [
    {id: "1", name: "Yahya", email: "yahya@gmail.com"},
    {id: "2", name: "Johnson", email: "johnson@gmail.com"},
    {id: "3", name: "Raj", email: "raj@gmail.com"}
]

const UserType = new GraphQLObjectType({
    name: "UserType",
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
            type: new GraphQLList(UserType),
            resolve(){
                return UsersList;
            }
        },
        //to get single user by id
        user:{
            type: UserType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return UsersList.find((user)=>user.id === args.id)
            }
        }
    }
})

const mutations = new GraphQLObjectType({
    name: 'mutations',
    fields:{
        // adding a user
        addUser:{
            type: UserType,
            args: {
                name:{type:GraphQLString},
                email:{type:GraphQLString},
            },
            resolve(parent, {name, email}){
                const newUser = {name, email, id:Date.now().toString()};
                UsersList.push(newUser);
                return newUser;
            }
        },

        //update a user
        updateUser:{
            type: UserType,
            args:{
                id: {type: GraphQLID},
                name: {type: GraphQLString},
                email: {type: GraphQLString},
            },
            resolve(parent, {id, name, email}){
                const user = UsersList.find((u)=>u.id === id);
                user.email = email;
                user.name = name;
                return user;
            }
        },

        //delete user
        deleteUser:{
            type: UserType,
            args:{
                id: {type: GraphQLID},
            },
            resolve(parent, { id }){
                const user = UsersList.find((u)=>u.id == id);
                UsersList = UsersList.filter((u)=> u.id !== id);
                return user;
            }
        }   
    }
})


const schema = new GraphQLSchema({query: RootQuery, mutation: mutations});

app.use("/graphql", graphqlHTTP({schema, graphiql: true}))

app.listen(5000, ()=>console.log("server started"))
