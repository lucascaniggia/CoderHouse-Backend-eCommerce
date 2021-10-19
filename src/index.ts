import 'dotenv/config.js';
import os from 'os';
import cluster from 'cluster';
import args from 'args';
import Config from 'config';
import Server from 'services/server';

const numCPUs = os.cpus().length;
const flags = args.parse(process.argv);

if (flags.mode === 'cluster' && flags.run !== 'pm2' && cluster.isMaster) {
  console.log(`CPUs Number ==> ${numCPUs}`);
  console.log(`PID MASTER ${process.pid}, ${new Date()}`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('exit', worker => {
    console.log(`Worker ${worker.process.pid} died at ${Date()}`);
    cluster.fork();
  });
} else {
  const PORT = Config.PORT;
  Server.listen(PORT, () => {
    console.log(
      `Server initialized in http://localhost:${PORT} - PID WORKER ${process.pid}`,
    );
  });
  Server.on('error', error => console.log(`Server error: ${error}`));
}
