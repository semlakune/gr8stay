const bcryptjs = require('bcryptjs')

let salt = bcryptjs.genSaltSync(8);
let hash = bcryptjs.hashSync("ajip12345", salt);

// user.password = hash

console.log(hash);
console.log(bcryptjs.compareSync('ajip12345',hash));