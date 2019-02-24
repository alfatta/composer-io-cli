const fs = require('fs');
const request = require('request');

const COOKIE = 'PHPSESSID=kj12838j1d982j39j1idj123jd'

const upload = (formData) => {
  return {
    method: 'POST',
    url: 'https://compressor.io/server/Lossy.php',
    headers: {
      Accept: 'application/json',
      Cookie: COOKIE,
      'Content-Type': 'multipart/form-data'
    },
    json: true,
    formData: formData
  }
}

const download = (url) => {
  return {
    method: 'GET',
    url: url,
    headers: {
      Cookie: COOKIE
    },
    encoding: null,
    gzip: true,
  }
}

fs.readdir('./source', (err, files) => {
  if (!err) {
    const regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.png|.gif|.svg)$");
    const fileList = files.filter(file => regex.test(file.toLowerCase()))

    fileList.forEach(file => {
      console.log(`Start processing ${file}`)
      const formData = {
        files: [fs.createReadStream(`./source/${file}`)],
      }

      request(upload(formData), (error, response, body) => {
        if (!error && body.files.length && body.files[0].url) {
          const file = body.files[0]

          request(download(file.url), (error, response, body) => {
            const fileName = file.name.split('.')
            fileName.splice(1, 0, ' [compressed].')
            const path = `./destination/${fileName.join('')}`

            fs.writeFileSync(path, body);
            console.log(`${file.name} : ${hs(file.size)} -> ${hs(file.sizeAfter)} (${file.percentage}%)`)
          })
        }
      })
    });
  }
});

function hs(size) {
  if (size < 1) return '0.00B';
  let i = Math.floor(Math.log(size) / Math.log(1024));
  i = i > 3 ? 3 : i;
  return (size / Math.pow(1024, i)).toFixed(2) + ['B', 'kB', 'MB', 'GB'][i];
}
