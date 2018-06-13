const si = require('systeminformation');
const Multispinner = require('multispinner');
const figures = require('figures');

class SystemInfo {
	constructor(fs) {
		this.fs = fs;
		this.data = {};
		this.spinners = ['System', 'BIOS', 'MotherBoard', 'CPU', 'RAM', 'Disk', 'GPU', 'Operating System',
			'Network Interfaces', 'DNS', 'Ping', 'Current Processes'];

		this.spinner = new Multispinner(this.spinners, {
			indent: 2,
			frames: ['[-]', '[\\]', '[|]', '[/]'],
			symbol: {
				success: '[' + figures.tick + ']',
				error: '[' + figures.cross + ']'
			}
    });
    
		this._run();

		this.spinner.on('done', () => {
			this.fs.saveJSON(this.data);
		});
	}

	async _run() {
		try {
			this.system(this.spinners[0]);
			this.bios(this.spinners[1]);
			this.motherBoard(this.spinners[2]);
			this.cpu(this.spinners[3]);
			this.memory(this.spinners[4]);
			this.disk(this.spinners[5]);
			this.graphics(this.spinners[6]);
			this.os(this.spinners[7]);
			this.netWorkInterfaces(this.spinners[8]);
			this.checkSite(this.spinners[9]);
			this.checkPing(this.spinners[10]);
			this.currentProcesses(this.spinners[11]);
		} catch (error) {
			console.log('error');
		}
	}

	/**
   * Gets the System data and update the spinner state
   *
   * @param {String} spinnerID
   */
	async system(spinnerID) {
		try {
			const data = await si.system();
			this.data.system = data;
			this.spinner.success(spinnerID);
		} catch (error) {
			this.data.system = error;
			this.spinner.error(spinnerID);
		}
	}

	/**
   * Gets the BIOS data and update the spinner state
   *
   * @param {String} spinnerID
   */
	async bios(spinnerID) {
		try {
			const data = await si.bios();
			this.data.BIOS = data;
			this.spinner.success(spinnerID);
		} catch (error) {
			this.data.BIOS = error;
			this.spinner.error(spinnerID);
		}
	}

	/**
   * Gets the Motherboard data and update the spinner state
   *
   * @param {String} spinnerID
   */
	async motherBoard(spinnerID) {
		try {
			const data = await si.baseboard();
			this.data.motherBoard = data;
			this.spinner.success(spinnerID);
		} catch (error) {
			this.data.motherBoard = error;
			this.spinner.error(spinnerID);
		}
	}

	/**
   * Gets the CPU data and update the spinner state
   *
   * @param {String} spinnerID
   */
	async cpu(spinnerID) {
		try {
			const data = await si.cpu();
			this.data.cpu = data;
			this.spinner.success(spinnerID);
		} catch (error) {
			this.data.cpu = error;
			this.spinner.error(spinnerID);
		}
	}

	/**
   * Gets the Memeory data and update the spinner state
   *
   * @param {String} spinnerID
   */
	async memory(spinnerID) {
		try {
			const data = await si.mem();
			this.data.memory = data;
			this.spinner.success(spinnerID);
		} catch (error) {
			this.data.memory = error;
			this.spinner.error(spinnerID);
		}
	}

	/**
   * Gets the Disk data and update the spinner state
   *
   * @param {String} spinnerID
   */
	async disk(spinnerID) {
		try {
			const data = await si.fsSize();
			this.data.disk = data;
			this.spinner.success(spinnerID);
		} catch (error) {
			this.data.disk = error;
			this.spinner.error(spinnerID);
		}
	}

	/**
   * Gets the GPU data and update the spinner state
   *
   * @param {String} spinnerID
   */
	async graphics(spinnerID) {
		try {
			const data = await si.graphics();
			this.data.gpu = data;
			this.spinner.success(spinnerID);
		} catch (error) {
			this.data.gpu = error;
			this.spinner.error(spinnerID);
		}
	}

	/**
   * Gets the OS and update the spinner state
   *
   * @param {String} spinnerID
   */
	async os(spinnerID) {
		try {
			const data = await si.osInfo();
			this.data.os = data;
			this.spinner.success(spinnerID);
		} catch (error) {
			this.data.os = error;
			this.spinner.error(spinnerID);
		}
	}

	/**
   * Gets the Network Interfaces and update the spinner state
   *
   * @param {String} spinnerID
   */
	async netWorkInterfaces(spinnerID) {
		try {
			const data = await si.networkInterfaces();
			this.data.netWorkInterfaces = data;
			this.spinner.success(spinnerID);
		} catch (error) {
			this.data.netWorkInterfaces = error;
			this.spinner.error(spinnerID);
		}
	}

	/**
   * Checks if google can be accessed and update the spinner state
   *
   * @param {String} spinnerID
   */
	async checkSite(spinnerID) {
		try {
			const data = await si.inetChecksite('https://google.com');
			this.data.checkSite = data;
			this.spinner.success(spinnerID);
		} catch (error) {
			this.data.checkSite = error;
			this.spinner.error(spinnerID);
		}
	}

	/**
   * Checks the ping to 8.8.8.8 and update the spinner state
   *
   * @param {String} spinnerID
   */
	async checkPing(spinnerID) {
		try {
			const data = await si.inetLatency('8.8.8.8');
			this.data.checkPing = data;
			this.spinner.success(spinnerID);
		} catch (error) {
			this.data.checkPing = error;
			this.spinner.error(spinnerID);
		}
	}

	/**
   * Get's the current open processes and update the spinner state
   *
   * @param {String} spinnerID
   */
	async currentProcesses(spinnerID) {
		try {
			const data = await si.processes();
			this.data.processes = data;
			this.spinner.success(spinnerID);
		} catch (error) {
			this.data.processes = error;
			this.spinner.error(spinnerID);
		}
	}
}

module.exports = SystemInfo;
