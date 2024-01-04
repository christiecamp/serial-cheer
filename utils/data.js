//users
const userSeed = [
    { username: 'lady', email: 'lady@gmail.com', thought: [] }
];

//thoughts
const thoughtSeed = [
    { thoughtText: 'test', username: 'lady', reaction: [] }
];

//reactions
const reactionSeed = [
    { reactionBody: 'test', username: 'lady' }
];

module.exports = { userSeed, thoughtSeed, reactionSeed }