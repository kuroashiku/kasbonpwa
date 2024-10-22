export const USBDeviceProfiles = [

	/* Zjiang ZJ-5805 */
	{
		filters: [
			{ vendorId: 0x0416, productId: 0x5011 },
		],
		
		configuration:		1,
		interface:			0,
		endpoint:			3,

		language:			'esc-pos',
		codepageMapping:	'zjiang'
	},
			
	/* Samsung SRP */
	{
		filters: [
			{ vendorId: 0x0419 }
		],
		
		configuration:		1,
		interface:			0,
		endpoint:			1,

		language:			'esc-pos',
		codepageMapping:	'bixolon'
	},
			
	/* Star */
	{
		filters: [
			{ vendorId: 0x0519 }
		],
		
		configuration:		1,
		interface:			0,
		
		language:			'star-prnt',
		codepageMapping:	'star'
	},

	/* Epson */
	{
		filters: [
			{ vendorId: 0x04b8 },
		],
		
		configuration:		1,
		interface:			0,
		endpoint:			1,

		language:			'esc-pos',
		codepageMapping:	'epson'
	},

	/* Citizen */
	{
		filters: [
			{ vendorId: 0x1d90 },
		],
		
		configuration:		1,
		interface:			0,
		endpoint:			2,

		language:			'esc-pos',
		codepageMapping:	'citizen'
	},
			
	/* Dtronic */
	{
		filters: [
			{ vendorId: 0x0fe6, productId: 0x811e },
		],
		
		configuration:		1,
		interface:			0,
		endpoint:			2,

		language:			'esc-pos',
		codepageMapping:	'epson'
	}
]


export const connectPrinterUSB = async () =>{
	let deviceHandle;
	try {
		const device = await navigator.usb.requestDevice({ 
			filters: []
		});
		deviceHandle = device;
		console.log(device);
		// const deviceProfile = USBDeviceProfiles.find(
		// 	item => item.filters.some(
		// 		filter => filter.vendorId && filter.productId ? filter.vendorId == device.vendorId && filter.productId == device.productId : filter.vendorId == device.vendorId
		// 	)
		// );
		
		await device.open();
		await device.selectConfiguration(1);
		await device.claimInterface(0);
		return device;
	}
	catch(error) {
		console.log('Could not connect USB Printer! ' + error);
		if(deviceHandle){
			deviceHandle.close();
		}
		return null;
	}
}

export const printUSB = async (device, command=[]) => {
  let endpoint = this._internal.profile.endpoint;
  if (!endpoint) {
    let i = this._internal.device.configuration.interfaces.find(i => i.interfaceNumber == this._internal.profile.interface);
    let e = i.alternate.endpoints.find(e => e.direction == 'out');

    if (e) {
      endpoint = e.endpointNumber;
    }
  }

  if (endpoint) {
    try {
      await this._internal.device.transferOut(endpoint, command);
    }
    catch(e) {
      console.log(e);
    }
  }
}