const fs = require('fs')
const path = require('path')

function readDirRecursive (dir) {
  files = fs.readdirSync(dir)
  
  return files.map((file) => {
    const filePath = path.join(dir, file)

    const result = {
      name: file,
      filePath,
      isDirectory: false,
      children: []
    }

    if (fs.statSync(filePath).isDirectory()) {
      result.isDirectory = true
      result.children = readDirRecursive(filePath)
    }
    return result
  })
}

function printFileMetaRecursive (list, space = 0) {
  let whitespace = ''  
  for (i = 0; i < space; ++i) {
    whitespace += ' '
  }

  list.forEach((file) => {
    if (file.isDirectory === true) {
      console.log(`${whitespace}[] ${file.name}`)
      printFileMetaRecursive(file.children, space + 2)
      
    } else {
      console.log(`${whitespace}- ${file.name}`)
    }
  })
}

const allFilesAndDirectories = readDirRecursive(__dirname)
printFileMetaRecursive(allFilesAndDirectories)

