#!/usr/bin/node

const fs = require('fs')
const path = require('path')

const prismaMigrationsDirectory = fs.readdirSync('prisma/migrations', {withFileTypes: true})
const prismaMigrations = prismaMigrationsDirectory.filter(dirent => dirent.isDirectory() === true)

const migrations = prismaMigrations.map(m => {
  const text = `
  {name: '${m.name}', module : require('../../prisma/migrations/${m.name}/migration.sql')}`
  return text
})

const queriesPath = 'database/queries'
const queriesDirectory = fs.readdirSync(queriesPath, {withFileTypes: true})
const queriesFolders = queriesDirectory.filter(dirent => dirent.isDirectory() === true)
const queriesFiles = queriesDirectory.filter(dirent => dirent.isDirectory() === false)
const queries = queriesFolders.reduce((arr, folder) => {
  let dirents = fs.readdirSync(path.join(queriesPath, folder.name), {withFileTypes: true})
  let files = dirents.filter(dirent => dirent.isDirectory() === false)
  files.forEach(file => {
    const text = `
  {name: '${path.join(folder.name, file.name)}', module : require('${path.join('../../', queriesPath, folder.name, file.name)}')}`
    arr.push(text)
  })
  return arr
}, [])
queriesFiles.forEach(file => {
  const text = `
  {name: '${file.name}', module : require('${path.join('../../', queriesPath, file.name)}')}`
  queries.push(text)
})

const _assetsFileContent = `
export const migrations = [
  ${migrations}
]

export const queries = [
  ${queries}
]

export default {migrations, queries}
`

fs.writeFileSync('src/assets/_assets.js', _assetsFileContent)

console.log(_assetsFileContent)
