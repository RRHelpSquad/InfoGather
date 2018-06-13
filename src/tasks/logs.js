const Multispinner = require('multispinner');
const figures = require('figures');
const shell = require('shelljs');
const fs = require('fs');
const vdf = require('vdfjs');


class Logs {
	constructor(fs, event) {
    this.fs = fs;
    this.event = event
    this.homeDir = require('os').homedir();
    
    this.spinners = ['Realm Royale', 'Realm Royale Launcher', 'EasyAntiCheat']

    this.files = { realmRoyale: ["", ""], realmRoyaleLauncher: "", easyAntiCheat: ""}
    this.steamPath = "";
    this.steamLibaries = [];
    this.gamePath = "";
  }
  
  async _run(event) {
    this.spinner = new Multispinner(this.spinners, {
      indent: 2,
      frames: ['[-]', '[\\]', '[|]', '[/]'],
      clear: false,
      symbol: {
        success: '[' + figures.tick + ']',
        error: '[' + figures.cross + ']'
      }

    });
    
    this.spinner.on('done', async () => {
      if(this.files.realmRoyale != "") {
        await this.fs.copyToTmp(this.files.realmRoyale[0]);
        await this.fs.copyToTmp(this.files.realmRoyale[1]);

      }

      if(this.files.realmRoyaleLauncher != "") {
        await this.fs.copyToTmp(this.files.realmRoyaleLauncher);
      }

      if(this.files.easyAntiCheat != "") {
        await this.fs.copyToTmp(this.files.easyAntiCheat);
      }

       this.event.emit("log_done");
    });

    try {
      this.realmRoyale(this.spinners[0]);
      this.realmRoyaleLauncher(this.spinners[1]);
      this.easyAntiCheat(this.spinners[2]);
    } catch (error) {
      console.log(error);
    }
  }

	async realmRoyale(spinnerID) {
    try {
      this._findRealmRoyale();
      this.spinner.success(spinnerID);
    } catch (error) {
      
    }
	}

	async realmRoyaleLauncher(spinnerID) {
    try {
      this.files.realmRoyaleLauncher = this.homeDir + "\\Documents\\My Games\\paladinsroyale\\RealmGame\\Logs\\Launch.log"
      this.spinner.success(spinnerID)
    } catch (error) {
      console.log(error)
    }
  }
  
  async easyAntiCheat(spinnerID) {
    try {
      this.files.easyAntiCheat = this.homeDir + "\\AppData\\Roaming\\EasyAntiCheat\\gamelauncher.log"
      this.spinner.success(spinnerID)
    } catch (error) {
      console.log(error)
    }
  }
  
  async _findRealmRoyale() {
    await shell.exec('reg query HKEY_CURRENT_USER\\Software\\Valve\\Steam /v SteamPath /s', {silent: true}, (code, stdout, stderr) => {
      this.steamPath = stdout.split("\r\n")[2].split("    ")[3]
      let libaryVDF = fs.readFileSync(this.steamPath + "\\steamapps\\libraryfolders.vdf", 'utf-8');
      this.libaryVDF = vdf.parse(libaryVDF);

      this.steamLibaries.push(this.steamPath + "\\steamapps\\common\\");
      this.steamLibaries.push(this.libaryVDF.LibraryFolders[1].replace("\\\\", "/") + "\\steamapps\\common\\");
  
      this.steamLibaries.forEach(element => {
        shell.cd(element)

        let newestSystemFile = "";
        let newestMCTSTFile = "";


        if (fs.existsSync('./Realm Royale')) {
          this.gamePath = element + "\\Realm Royale";
          let path = this.gamePath + "\\Binaries\\Logs\\"

          let newestMCTSTime = 0;
          let newestSystemTime = 0;

          fs.readdirSync(path).forEach((file) => {
            let data = fs.statSync(path + "\\" + file);

            if(file.includes("MCTS")) {
              if(data.ctime > newestMCTSTime) {
                newestMCTSTime = file.ctime
                newestMCTSTFile = file;
              }
            }

            if(file.includes("system")) {
              if(data.ctime > newestSystemTime) {
                newestSystemTime = file.ctime
                newestSystemFile = file;
              }
            }
            
            
          });

          this.files.realmRoyale[0] = path + newestMCTSTFile;
          this.files.realmRoyale[1] = path + newestSystemFile;
        }
      });
    });



  }
}

module.exports = Logs;