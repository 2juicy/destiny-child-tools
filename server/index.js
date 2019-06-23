const express = require('express'),
      bodyParser = require('body-parser'),
      fs = require('fs'),
      path = require('path'),
      fileUpload = require('express-fileupload'),
      {exec} = require('child_process')

const app = express()
const port = 3000

app.use(bodyParser.json({extended: true, limit: '50mb'}))
app.use(bodyParser.urlencoded())
app.use(fileUpload({limits: { fileSize: 50 * 1024 * 1024 }}))

app.post('/childs', (req, res) => {
  fs.writeFileSync(path.resolve(__dirname, '../docs/data/childs.json'),
    JSON.stringify(req.body, null, 2)
  )
  res.send(req.body)
})

app.post('/mod', function(req, res) {
  req.files.pck.mv(path.join(__dirname, '../pckmanager', req.files.pck.name))
  const name = req.files.pck.name.replace('.pck', '')

  const stringify = mod =>
    mod.child + '_' +
    mod.variant + '-' +
    mod.modder.toLowerCase().replace(/\s/g, '_') + '-' +
    mod.name.toLowerCase().replace(/\s/g, '_')

  const mod = {
    name: req.body.name,
    variant: name.replace(/^.+_/, ''),
    child: name.replace(/_.+$/, ''),
    modder: req.body.modder
  }

  function run(cmd) {
    const exec = require('child_process').exec
    return new Promise((resolve, reject) => {
      exec(cmd, (error, stdout, stderr) => {
        if(error) {
          console.warn(error)
        }
        resolve(stdout ? stdout : stderr)
      })
    })
  }
  // const run = command => {
  //   exec(command)
  // }

  const pckPath = path.join(__dirname, '../pckmanager/'),
        assetPath = path.join(__dirname, '../docs/live2d/assets/'),
        modsDataPath = path.join(__dirname, '../docs/data/mods.json')

  run(`rm -rf ${pckPath}${name}`)
    .then(() => run('./pckmanager/PCK.exe /L ./pckmanager/' + name + '.pck'))
    // try to extract live2d (kr/jp only)
    .then(() => run(`rm -rf ${assetPath}${stringify(mod)}`))
    .then(() => {
      if(fs.existsSync(`${pckPath}${name}/MOC.${name}.json`)) {
        // copy extracted live2d to assets
        console.log('Live2d successfully extracted')
        return run(`mv ${pckPath}${name} ${assetPath}${stringify(mod)}`)
      }
      else {
        // copy extracted live2d to assets
        console.log('Copying existing path')
        return run(`cp -r ${assetPath}${name} ${assetPath}${stringify(mod)}`)
          .then(() => {
            let origPngName, newPngName
            fs.readdirSync(`${pckPath}${name}/`).forEach(function(file) {
              if(file.match(/.png$/)) origPngName = file
            })
            fs.readdirSync(`${assetPath}${stringify(mod)}/`).forEach(function(file) {
              if(file.match(/.png$/)) newPngName = file
            })
            return run(`cp ${pckPath}${name}/${origPngName}  ${assetPath}${stringify(mod)}/${newPngName}`)
          })
      }
    })
    // // name json file for live2d
    .then(() => run(`mv ${assetPath}${stringify(mod)}/MOC.${name}.json ${assetPath}${stringify(mod)}/MOC.${stringify(mod)}.json`))
    // create unitersal
    .then(() => run(`rm -rf ${pckPath}${name}`))
    .then(() => run('./pckmanager/PCK.exe /U /C ./pckmanager/' + name + '.pck'))
    .then(() => run('./pckmanager/PCK.exe ./pckmanager/' + name + '/'))
    .then(() => run(`mv ${pckPath}${name}/.pck.new ${assetPath}${stringify(mod)}/${name}.pck`))
    .then(() => run(`rm -rf ${pckPath}${name}`))
    .then(() => {
      const mods = JSON.parse(fs.readFileSync(modsDataPath))
      mods.push(mod)
      fs.writeFileSync(modsDataPath, JSON.stringify(mods, null, 2))
    })
    .then(() => res.redirect(req.body.backUrl))
})

app.listen(port, () => console.log(`Development API server running on port ${port}!`))
