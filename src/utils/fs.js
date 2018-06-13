const fs = require('fs');
const jsonFile = require('jsonfile');

class FS {
	constructor() {
		this.tmp = './tmp';

		if (!fs.existsSync('./tmp')) {
			fs.mkdirSync('./tmp');
		}
	}

	async saveJSON(json) {
		jsonFile.writeFileSync("system.json", json, { spaces: 2 } , (err) => {
        console.log(err);
    });
	}

	async copyToTmp() {

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
