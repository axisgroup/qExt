const fs = require('fs-extra')
const program = require('commander')
const path = require('path')
const babel = require('babel-core')


// Define source and target
const srcDir = 'src'
const targetDir = 'dist/bundle'

// Set up dist
const mkDist = fs.ensureDir(targetDir)

// Run for initial compile
compileFromDir(srcDir, targetDir)


// Listen for command parameters
program
  .option('-w, --watch', 'Watch')
  .parse(process.argv)

// Watch changes in source
if(program.watch) {
  fs.watch('src', { recursive: true }, (e, file) => {
    console.log(`updated ${file}`)
    
    compileFromDir(srcDir, targetDir)
  })
}


function compileFromDir(srcDir, targetDir) {
  // read all files in srcDir
  const readSrc = mkDist.then(() => fs.readdir(srcDir))
  
  readSrc.then(srcFiles => {
    // for each file
    srcFiles.forEach(file => {
      // get lstat
      const fileLStat = fs.lstat(path.join(srcDir, file))
  
      // stats output
      fileLStat.then(stats => {
        // if stats is a .js file
        if(stats.isFile() && file.match(/.js$/g) !== null) {
          babel.transformFile(
            path.join(srcDir, file),
            {
              presets: ['es2015'],
              plugins: [
                'transform-object-rest-spread',
                'add-module-exports',
                'transform-es2015-modules-commonjs',
                'transform-runtime'
              ]
            },
            function(err, result) {
              if(err) return console.log(err)
              fs.writeFile(path.join(targetDir, file), result.code, function(err) {
                if(err) return console.log(err)
              })
            }
          )
        } else if(stats.isDirectory()) {
          fs.ensureDirSync(path.join(targetDir, file))
          compileFromDir(
            path.join(srcDir, file),
            path.join(targetDir, file)
          )
        }
      })
    })
  })
}