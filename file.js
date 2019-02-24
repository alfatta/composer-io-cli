const fs = require('fs')

fs.readdir('./source', (err, files) => {
  if (!err) {
    let regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.png|.gif|.svg)$");
    console.log(files.filter(file => regex.test(file.toLowerCase())));
  }
});
