const bcryptjs = require('bcryptjs')

let salt = bcryptjs.genSaltSync(8);
let hash = bcryptjs.hashSync("mirza123", salt);

// user.password = hash

console.log(hash);
console.log(bcryptjs.compareSync('mirza123',hash));