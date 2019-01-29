const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const should = require('chai').should()
chai.use(chaiAsPromised).should()

const path = require('path')
const fs = require('fs-extra')
const { exec } = require('child_process')

const { BehaviorSubject } = require('rxjs')
const { filter, tap } = require('rxjs/operators')

const templateDirectory = path.resolve(__dirname, '../../qext/template')
const testDirectory = path.resolve(__dirname, './TestExtension')
const extensionName = 'test-extension'

describe('qExt Scripts', function() {
  this.timeout(20000)
  /* Create Vanilla Subject to trigger when vanilla test done */
  const vanillaDone$ = new BehaviorSubject(false)

  /* Create new TestExtension Folder */
  before('Copying template directory', function() {
    console.log('Copying template directory')
    return new Promise(resolve => {
      fs.copy(
        templateDirectory, 
        testDirectory
      ).then(() => {
        resolve()
      })
    })
  })


  /* ================================
      Vanilla Build
  ================================ */
  describe('vanilla build', function() {
    this.timeout(10000)

    before('Running qext-scripts', function() {
      return new Promise(resolve => {
        /* Set qext.config.json to vanilla settings */
        /* Read in qext.config.json contents */
        fs.readJson(`${testDirectory}/qext.config.json`)
          .then(config => {
            /* set proper vanilla options */
            const vanillaOptions = {
              mode: 'vanilla',
              deploy: false
            }

            /* merge vanilla options with config */
            return Object.assign(config, vanillaOptions)
          })
          /* Write updated config to qext.config.json */
          .then(config => fs.writeJson(`${testDirectory}/qext.config.json`, config))
          /* run qext-scripts */
          .then(() => {
            exec('node ../../bin/qext-scripts', {
              cwd: testDirectory
            }, function() {
              resolve()
            })
          })
      })
    })

    it('should create dist folder with the source folder copied in', function(done) {
      const templateFiles = fs.readdir(`${templateDirectory}/src`)
      const distFiles = fs.readdir(`${testDirectory}/dist/${extensionName}`)

      Promise.all([templateFiles, distFiles]).then(([templateFiles, distFiles]) => {
        distFiles.should.deep.equal(templateFiles)
        done()
      })
    })

    it('should have the extension files zipped', function(done) {
      fs.stat(`${testDirectory}/dist/${extensionName}.zip`).then(() => {
        done()
      })
    })

    after('Cleanup TestDirectory dist', () => {
      return new Promise(resolve => {
        fs.remove(`${testDirectory}/dist`).then(() => {
          vanillaDone$.next(true)
          resolve()
        })
      })
    })
  })

  
  /* ================================
      Compile Build
  ================================ */
  describe('compile build', () => {

    before('Running qext-scripts', () => {
      return new Promise(resolve => {
        /* Wait for vanilla test to finish */
        vanillaDone$.pipe(
          filter(status => status)
        ).subscribe(() => {
          /* Set qext.config.json to compile settings */
          /* Read in qext.config.json contents */
          fs.readJson(`${testDirectory}/qext.config.json`)
            .then(config => {
              /* set proper compile options */
              const compileOptions = {
                mode: 'compile',
                deploy: false,
                compile: Object.assign(config.compile, { watch: false })
              }

              /* merge compile options with config */
              return Object.assign(config, compileOptions)
            })
            /* Write updated config to qext.config.json */
            .then(config => fs.writeJson(`${testDirectory}/qext.config.json`, config))
            /* run qext-scripts */
            .then(() => {
              exec('node ../../bin/qext-scripts', {
                cwd: testDirectory
              }, () => { resolve() })
            })
        })
      })
    })

    it('should create dist folder with built extension project inside', done => {
      fs.stat(`${testDirectory}/dist/${extensionName}`).then(() => { done() })
    })

    it('should have a built extension javascript file inside', done => {
      fs.stat(`${testDirectory}/dist/${extensionName}/${extensionName}.js`).then(() => { done() })
    })

    it('should have a qext file inside', done => {
      fs.stat(`${testDirectory}/dist/${extensionName}/${extensionName}.qext`).then(() => { done() })
    })

    it('should have a static directory inside', done => {
      fs.stat(`${testDirectory}/dist/${extensionName}/static`).then(() => { done() })
    })

    it('should have a zipped up project file', done => {
      fs.stat(`${testDirectory}/dist/${extensionName}.zip`).then(() => { done() })
    })

    after('Cleanup TestDirectory dist', () => {
      return new Promise(resolve => {
        fs.remove(`${testDirectory}/dist`).then(() => { resolve() })
      })
    })
  })


  after('Cleanup TestDirectory', () => {
    return new Promise(resolve => {
      fs.remove(`${testDirectory}`).then(() => { resolve() })
    })
  })
})