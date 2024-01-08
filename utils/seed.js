const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { userSeed, thoughtSeed, reactionSeed } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    //change to ascii during polish
    console.log('connected');
    //delete collections if they exist
    await User.deleteMany({});
    await Thought.deleteMany({});

    //seeded data exists within empty arrays
    const users = [];
    const thoughts = [];

    //add objects - user
    for (let i = 0; i <userSeed.length; i++) {
        const killer = {
            username: userSeed[i].username,
            email: userSeed[i].email
        };
        const newKiller = await User.create(killer);
        users.push({
            _id: newKiller._id.toString(),
            username: newKiller.username,
            email: newKiller.email
        });
    };

    //add objects - thoughs

//loop through & display
console.table(users);
console.table(thoughts);
console.info('Seeding complete! 🌱');
process.exit(0);
});


