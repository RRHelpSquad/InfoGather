const SystemInfo = require('./tasks/systemInfo');
const events = require('events');
const Logs = require('./tasks/logs');
const FS = require('./utils/fs');

let event = new events.EventEmitter();
const fs = new FS();

const system = new SystemInfo(fs, event);
const logs = new Logs(fs, event);

console.log('\nGathering System Information');
system._run();


event.on("system_done", () => {
  console.log('\nGathering Logs');
  logs._run();
})

event.on("log_done", () => {
  fs.makeZip(logs.realmRoyaleFilenames);
});