//users
const userSeed = [
    { username: 'lady', email: 'lady@gmail.com', thoughts: [] }
];

//thoughts
const thoughtSeed = [
    { thoughtText: 'test', username: 'lady' }
];

//reactions
const reactionSeed = [
    { reactionBody: 'test', username: 'lady' }
];

module.exports = { userSeed, thoughtSeed, reactionSeed }