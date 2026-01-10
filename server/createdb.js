const mongoose = require("mongoose");

const { createUsers } = require('./dbtools/createUsers');
const path = require('path');
const scriptName = path.basename(process.argv[1]);

require("dotenv").config();

const MONGO_URI = process.env.MONGODB_URI;
console.log(MONGO_URI);

const userArgs = process.argv.slice(2);
const allowedKeys = ['clean', 'run', 'users'];
const args = {};
userArgs.forEach(arg => {
  const [key, value] = arg.split('=');
  if (!allowedKeys.includes(key)) {
    console.error(`❌ Illegal argument: ${key}`);
    printUsageAndExit();
  }
  args[key] = value === undefined ? undefined : value;  // Track undefined explicitly for 'run'
});


// Validate optional numeric args early
const userCount = args.users ? parseInt(args.users) : 3;
let clean = false;
// CLEAN option
if ('clean' in args) {
  // Only 'clean' allowed (no other keys)
  if (Object.keys(args).length > 1 || args.clean !== undefined) {
    console.error('❌ Invalid "clean" usage.');
    printUsageAndExit();
  }
  clean = true;
}
// RUN option
else if ('run' in args) {
  if (args.run !== undefined) {
    console.error('❌ "run" should not have a value.');
    printUsageAndExit();
  }

  // Validate userCount
  if (userCount > 20 || userCount < 1 || isNaN(userCount)) {
    console.error('❌ "users" must be between 1 and 20.');
    printUsageAndExit();
  }

}
// Neither 'clean' nor 'run'
else {
  console.error('❌ Missing "run" or "clean" argument.');
  printUsageAndExit();
}


// Print usage
function printUsageAndExit() {
  console.log(`
Usage:
  node ${scriptName} run [users=<2-20>]
  node ${scriptName} clean

Defaults:
  users = 3 (test users)
`);
  process.exit(1);
}

async function main() {
  try {
    await mongoose.connect(MONGO_URI);
    await createUsers(clean ? -1 : userCount);
  } catch (err) {
    console.error("💥 Global error:", err);
  } finally {
    await mongoose.disconnect();
  }
}

main();
