const fs = require('fs');
const jsonFile = require('jsonfile');

class FS {
	constructor() {
		this.tmp = './tmp';
    this.cwd = process.cwd();

		if (!fs.existsSync('./tmp')) {
			fs.mkdirSync('./tmp');
		}
	}

	async saveJSON(json) {
		jsonFile.writeFileSync("./tmp/system.json", json, { spaces: 2 } , (err) => {
        console.log(err);
    });
	}

	async copyToTmp(file) {
    try {
      let fileName = file.split('\\');
      if(fileName[fileName.length - 1] != undefined) {
        await fs.copyFileSync(file, this.cwd + "\\tmp\\" + fileName[fileName.length - 1]);
      }
    } catch (error) {
      console.log(error);
    }
	}

	async getTmp() {

	}

	async makeZip() {

	}

	async searchDrive(drive, file) {

	}

	async removeTmp() {

	}
}

module.exports = FS;
