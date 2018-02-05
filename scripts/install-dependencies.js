module.exports = function(extensionName) {
  var childProcess = require('child_process');

  // install qext-scripts
  childProcess.spawn(
    'npm',
    ['install', '--save', 'qext-scripts'],
    { 
      env: process.env,
      cwd: process.cwd() +`/${extensionName}`,
      shell: true,
      stdio: 'inherit'
    }
  )
}
