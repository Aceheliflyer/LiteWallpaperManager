import { fork } from 'child_process'
process.chdir(__dirname)

var restartData: any
const init = () => {
  var main = fork('./main.ts')

  main.on('message', (msg: any) => {
    console.log('Msg:', msg)
    if (msg.type === 'restart') {
      restartData = msg
    } else if (msg._ready && restartData) {
      main.send(restartData)
      restartData = undefined
    }
  })

  main.on('exit', (code) => {
    switch (code) {
      case 0:
        console.log('Exiting...')
        process.exit(0)
      case 1:
        console.log('Restarting...')
        init()
        break
      default:
        console.log('Unknown exit case, restarting...')
        init()
        break
    }
  })
}

console.log('Initializing...')
init()
