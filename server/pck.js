const immutable = require('immutable'),
      express = require('express'),
      bodyParser = require('body-parser'),
      fs = require('fs'),
      path = require('path'),
      fileUpload = require('express-fileupload'),
      {execSync} = require('child_process')

const stringify = mod =>
  mod.child + '_' +
  mod.variant + '-' +
  mod.modder.toLowerCase().replace(/\s/g, '_') + '-' +
  mod.name.toLowerCase().replace(/\s/g, '_')

const name = 'c227_02',
      mod = {
        name: 'Test mod',
        variant: name.replace(/^.+_/, ''),
        child: name.replace(/_.+$/, ''),
        modder: 'Loki'
      }

const run = command => {
  execSync(command, (err, stdout, stderr) => {
    if(err) {
      // node couldn't execSyncute the command
      return
    }

    // the *entire* stdout and stderr (buffered)
    console.log(`stdout: ${stdout}`)
    console.log(`stderr: ${stderr}`)
  })
}

const pckPath = path.join(__dirname, '../pckmanager/'),
      assetPath = path.join(__dirname, '../docs/live2d/assets/'),
      modsDataPath = path.join(__dirname, '../docs/data/mods.json')

run(`rm -rf ${pckPath}${name}`)

// try to extract live2d (kr/jp only)
run('./pckmanager/PCK.exe /L ./pckmanager/' + name + '.pck')
run(`rm -rf ${assetPath}${stringify(mod)}`)
if(fs.existsSync(`${pckPath}${name}/MOC.${name}.json`)) {
  // copy extracted live2d to assets
  console.log('Live2d successfully extracted')
  run(`mv ${pckPath}${name} ${assetPath}${stringify(mod)}`)
}
else {
  // copy extracted live2d to assets
  console.log('Copying existing path')
  run(`cp -r ${assetPath}${name} ${assetPath}${stringify(mod)}`)
  let origPngName, newPngName
  fs.readdirSync(`${pckPath}${name}/`).forEach(function(file) {
    if(file.match(/.png$/)) origPngName = file
  })
  fs.readdirSync(`${assetPath}${stringify(mod)}/`).forEach(function(file) {
    if(file.match(/.png$/)) newPngName = file
  })
  run(`cp ${pckPath}${name}/${origPngName}  ${assetPath}${stringify(mod)}/${newPngName}`)
}
// // name json file for live2d
run(`mv ${assetPath}${stringify(mod)}/MOC.${name}.json ${assetPath}${stringify(mod)}/MOC.${stringify(mod)}.json`)
//
// run(`mv ${pckPath}${name} ${assetPath}${stringify(mod)}`)
// // create unitersal
// run(`rm -rf ${pckPath}${name}`)
// run('./pckmanager/PCK.exe /U /C ./pckmanager/' + name + '.pck')
// run('./pckmanager/PCK.exe ./pckmanager/' + name + '/')
// run(`mv ${pckPath}${name}/.pck.new ${assetPath}${stringify(mod)}/${name}.pck`)
// run(`rm -rf ${pckPath}${name}`)
//
// const mods = JSON.parse(fs.readFileSync(modsDataPath))
// mods.push(mod)
// fs.writeFileSync(modsDataPath, JSON.stringify(mods, null, 2))
