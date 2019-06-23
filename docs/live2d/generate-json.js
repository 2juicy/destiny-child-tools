#!/usr/bin/env node

const fs = require('fs'),
      path = require('path')

const data = fs.readdirSync(path.join(__dirname, 'assets')).reduce((acc, dir) => {
  if(dir.match(/^[a-z]\d\d\d_\d\d$/)) {
    const data = {id: dir}
    if(fs.existsSync(path.join(__dirname, `assets/${dir}/asset.json`))) {
      var asset = require(path.join(__dirname, `assets/${dir}/asset.json`))
      Object.assign(data, asset)
    }
    acc.push(data)
  }
  return acc
}, [])

fs.writeFileSync(path.join(__dirname, './assets.json'), JSON.stringify(data))
