const usernames = [
    'James',
    'Robert',
    'John',
    'Michael',
    'David',
    'Aaron-James',
    'William'	,
    'Richard',
    'Joseph',
    'Thomas',
    'Charles',
    'Smith',
    'Jones',
    'Clark',
    'Grace',
    'Kelsey',
    'Tamar',
    'Alex',
    'Mark',
    'Tamar',
    'Farish',
    'Sarah',
    'Nathan',
    'Parker',
];

const thoughts = [
  'Feeling better',
  'hope! you are good',
  'work hard',
  'learn more',
  'practice the coding hard',
  'learn new concepts everyday',
  'it is snowing today'	,
  'it is soo cold outside',
  'dont give up',
  'do your best',
  'stay positive',
  'stars cant shine without darkness',
  'believe you can do your best!',
  'enjoy little things in life',
  'focus on yor goal',
  'Dreams dont work unless you do',
  'shine like a star',
  'you do not find the happy life. you make it',
  '"If I got rid of my demons',
  'make your life matter and have fun doing it',
  'action truly brings you closer to your dreams',
  'you only live once',
  'start a new beginning',
  'be happy for this moment',
];

const reactions = [
    "nice",
    "cool",
    "awesome",
    "elegant",
    "nothing",
    "happy",
    "sad",
    "say something",
    "please repeat"
]

// gets a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// gets a random username
const getRandomUsername = () =>
  `${getRandomArrItem(usernames)}${getRandomArrItem(usernames)}`;

// Function to generate random thoughts so that we can add to user object.
const getRandomThoughts = (int) => {
    let results = [];
    for (let i = 0; i < int; i++) {
      results.push({
        thoughtText: getRandomArrItem(thoughts),
        username: getRandomUsername(),
        reactions: [...getReactions(2)]
      });
    }
    return results;
};

// Function to generate a random reaction associated with a random user to a thought
const getReactions = (int) => {
    let results = [];
    for (let i = 0; i < int; i++) {
      results.push({
        reactionBody: getRandomArrItem(reactions),
        username: getRandomUsername(),
      });
    }
    return results;
};

module.exports = { getRandomUsername, getRandomThoughts }

