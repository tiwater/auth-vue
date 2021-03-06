'use strict'

const shell = require('shelljs')
const chalk = require('chalk')
const fs = require('fs')

const NPM_DIR = `dist`
const BUNDLE_CMD = `yarn bundle`
const BUNDLES_DIR = `${NPM_DIR}/bundles`

shell.echo(`Start building...`)

shell.rm(`-Rf`, `${NPM_DIR}/*`)
shell.mkdir(`-p`, `./${BUNDLES_DIR}`)

// Bundle using rollup
if (shell.exec(BUNDLE_CMD).code !== 0) {
  shell.echo(chalk.red(`Error: Rollup failed`))
  shell.exit(1)
}

shell.echo(chalk.green(`Bundling completed`))

shell.cp(`-Rf`, [`src`, `package.json`, `*.md`], `${NPM_DIR}`)

shell.echo(`Modifying final package.json`)
const packageJSON = JSON.parse(fs.readFileSync(`./${NPM_DIR}/package.json`))
packageJSON.private = false
packageJSON.scripts.prepare = '';

// Remove "dist/" from the entry-point paths.
['main', 'module', 'types'].forEach(function (key) {
  if (packageJSON[key]) {
    packageJSON[key] = packageJSON[key].replace('dist/', '')
  }
})

fs.writeFileSync(`./${NPM_DIR}/package.json`, JSON.stringify(packageJSON, null, 4))

shell.echo(chalk.green(`End building`))
