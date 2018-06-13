const fs = require('fs');
const jsonFile = require('jsonfile');
const tar = require('tar');
const zip = require("node-native-zip");

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

	async makeZip(files) {
    var archive = new zip();
    
    archive.addFiles([ 
        { name: files[0], 					path: this.cwd + "/tmp/" + files[0] },
				{ name: files[1], 					path: this.cwd + "/tmp/" + files[1] },
				{ name: "gamelauncher.log", path: this.cwd + "/tmp/gamelauncher.log" },
				{ name: "launch.log", 			path: this.cwd + "/tmp/launch.log" },
				{ name: "system.json", 			path: this.cwd + "/tmp/system.json" },
    ], (err) => {
        if (err) return console.log("err while adding files", err);
        
        var buff = archive.toBuffer();
        
        fs.writeFile( this.cwd + "/result.zip", buff, function () {
            console.log("Finished");
        });
    });
		// let files = ['/tmp/gamelauncher.log']
		// tar.c({gzip: true, cwd: this.cwd}, files).pipe(fs.createWriteStream(this.cwd + '/my-tarball.tgz'));
	}

	async removeTmp() {

	}
}

module.exports = FS;
