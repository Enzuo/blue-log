#!/usr/bin/node

const fs = require('fs')

const prismaMigrationsDirectory = fs.readdirSync('prisma/migrations', {withFileTypes: true})
const prismaMigrations = prismaMigrationsDirectory.filter(dirent => dirent.isDirectory() === true)

console.log(prismaMigrations)

const migrations = prismaMigrations.map(m => {
  const text = `
  {name: '${m.name}', module : require('../../prisma/migrations/${m.name}/migration.sql')}`
  return text
})

const _migrationsFileContent = `
export const migrations = [
  ${migrations}
]

export default {migrations}
`

fs.writeFileSync('src/assets/_assets.js', _migrationsFileContent)

console.log(_migrationsFileContent)
