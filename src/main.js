const SystemInfo = require('./tasks/systemInfo');
const FS = require('./utils/fs');

const fs = new FS();

console.log('\n');
console.log('Gathering System Information');
const system = new SystemInfo(fs);
