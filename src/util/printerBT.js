import { BT_SERVICE_CODE, BT_WRITE_CODE } from "../constant/appCommon";

class CallbackQueue {
  constructor() {
      this._queue = [];
      this._working = false;
  }

  add(data) {
      let that = this;

      async function run() {
          if (!that._queue.length) {
              that._working = false;
              return;
          }

          that._working = true;

          let callback = that._queue.shift();
          await callback();

          run();
      }

      this._queue.push(data);

      if (!this._working) {
          run();
      }
  }
}

export const connectPrinterBT = async () =>{
	let deviceHandle;
	try{
		const device = await navigator.bluetooth.requestDevice({ filters: [{ services: [BT_SERVICE_CODE]}] });
		deviceHandle = device;
		const server = await device.gatt.connect();
		const service = await server.getPrimaryService(BT_SERVICE_CODE);
		const activeDevice = await service.getCharacteristic(BT_WRITE_CODE);
		return activeDevice;
	}catch(err){
		console.log('Could not connect BT Printer! ' + err);
		if(deviceHandle){
			deviceHandle.gatt.disconnect();
		}
		return null;
	}
}

export const printBT = async (device, command=[]) => {
  const queue = new CallbackQueue();
  return new Promise(resolve => {
    const maxLength = 100;
    let chunks = Math.ceil(command.length / maxLength);

    if (chunks === 1) {
      let data = command;

      queue.add(() => device.writeValue(data));
    } else {
      for (let i = 0; i < chunks; i++) {
        let byteOffset = i * maxLength;
        let length = Math.min(command.length, byteOffset + maxLength);
        let data = command.slice(byteOffset, length);

        queue.add(() => device.writeValue(data));
      }
    }

    queue.add(() => resolve());
  });
}