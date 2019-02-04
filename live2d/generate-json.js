#!/usr/bin/env node

const fs = require('fs')

const data = fs.readdirSync('assets').reduce((acc, dir) => {
  console.log(dir);
  const [id, modder, name] = dir.split('-')
  acc[id] = {}
  if(modder) acc[id].modder = modder
  if(name) acc[id].name = name
  return acc
}, {})

fs.writeFileSync('./assets.json', JSON.stringify(data))
