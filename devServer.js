// eslint-disable-file
// NOTE: this file was created because filesystem watchers don't work on wsl2 ubuntu at the moment and tools like nodemon do not seem to sync wait for for restart tasks
// TODO: switch to async promises
// TODO: use colors
const inquirer = require('inquirer')
const childProcess = require('child_process')
const kill = require('tree-kill')
const fkill = require('fkill')

const spawnOptions = {
  cwd: __dirname,
  shell: true,
  env: process.env,
}

function killServer(killed) {
  fkill(':8080', {
    force: true,
    tree: true,
    ignoreCase: true,
    silent: true,
  })
    .then(killed)
    .catch(genericError)
}

function killAll() {
  killServer(() => {
    kill(1)
  })
}

function genericError() {
  console.error('Something unknown went wrong exiting')
  return killAll()
}

function streamOutputToConsole(process) {
  process.stdout.on('data', (data) => {
    console.log(data.toString())
  })
  process.stderr.on('data', (data) => {
    console.error(data.toString())
  })
}

function start() {
  const startProcess = childProcess.spawn('yarn run start', [], spawnOptions)
  streamOutputToConsole(startProcess)
}

function build(exit) {
  const compileTypeScriptProcess = childProcess.spawn(
    'yarn run build',
    [],
    spawnOptions,
  )
  streamOutputToConsole(compileTypeScriptProcess)
  compileTypeScriptProcess.on('exit', exit)
}

function promptRestart() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'restart',
        message: 'Restart your server (blank for yes, any input for no)?',
      },
    ])
    .then((answers) => {
      // TODO: do I need an exec sync of this to ensure server is dead? lsof -i tcp:8080 | awk 'NR!=1 {print $2}' | xargs kill
      if (answers['restart']) {
        return killAll()
      }

      killServer(() => {
        build((code, signal) => {
          if (code != 0 || signal) {
            console.error('TypeScript compilation failed')
            return promptRestart()
          }
          start()
          promptRestart()
        })
      })
    })
    .catch(() => {
      console.error('prompt exit')
      genericError()
    })
}

// TODO: consider adding first run skip
promptRestart()
