import cluster from "cluster"
import os from 'os'
import { dirname}  from "path"
import { fileURLToPath } from "url"

const _dirname =dirname(fileURLToPath(import.meta.url))

const cpuCount = os.cpus().length
console.log("total cpus : ",cpuCount)
console.log("primary pid : ", process.pid)

cluster.setupPrimary({
    exec: _dirname + "/server.js"
})

for(let i =0;i <cpuCount; i++){
    cluster.fork()
}

cluster.on('exit',(worker,code,signal)=>{
    console.log("total cpus : ",cpuCount)
    console.log("primary pid : ", process.pid)
    cluster.fork()
})

// npx loadtest -n -c 400 -k http://localhost:3000/heavy