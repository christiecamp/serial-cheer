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

    //add objects - thoughts
    for (let i = 0; i < thoughtSeed.length; i++) {
        const serial = {
            thoughtText: thoughtSeed[i].thoughtText,
            username: thoughtSeed[i].username,
            reactions: [reactionSeed[i]]
        };
        const newSerial = await Thought.create(serial);
        thoughts.push({
            _id: newSerial._id.toString(),
            username: newSerial.username
        });
    };

    //add objects - thoughts to users
    for (let i = 0; i < thoughts.length; i++) {
        const killerId = users.filter(
            (killer) => killer.username === thoughts[i].username
        );
        await User.findByIdAndUpdate(
            { _id: killerId[0]._id },
            { $push: { thoughts: thoughts[i]._id } },
            { new: true }
        );
    };

//loop through & display
console.table(users);
console.table(thoughts);
console.info('Seeding complete! 🌱');
process.exit(0);
});


