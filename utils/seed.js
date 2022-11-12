const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { getRandomUsername, getRandomThoughts } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
    console.log("connected son");

    // Here ,it will drop existing users
    await User.deleteMany({});
    
    // Here, it will drop existing thoughts
    await Thought.deleteMany({});
    
    const users = [];

    const thoughts = getRandomThoughts(15);

    // It will add 10 random users to the array
    for (let i = 0; i < 10; i++) {
        const username = getRandomUsername();
        const email = `${username}@gmail.com`

        users.push({
            username,
            email
        })
    }
    
    // Add users to the collection and await results 
    await User.collection.insertMany(users);
    
    // Add thoughts to the collection and await results
    await Thought.collection.insertMany(thoughts);
    
    console.table(users);
    console.table(thoughts);
    console.info('database seeded!');
    process.exit(0);

});