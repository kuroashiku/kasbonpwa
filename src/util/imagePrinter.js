// let progress = document.querySelector('#progress');
// let dialog = document.querySelector('#dialog');
// let message = document.querySelector('#message');
// let printButton = document.querySelector('#print');
// let printCharacteristic;
// let index = 0;
// let data;
// progress.hidden = true;

// let image = document.querySelector('#image');
// // Use the canvas to get image data
// let canvas = document.createElement('canvas');
// // Canvas dimensions need to be a multiple of 40 for this printer
// canvas.width = 120;
// canvas.height = 120;
// let context = canvas.getContext("2d");
// context.drawImage(image, 0, 0, canvas.width, canvas.height);
// let imageData = context.getImageData(0, 0, canvas.width, canvas.height).data;

export const printImageBT = async (device, canvas) => {
    let index=0;
    let data=null;
    // Canvas dimensions need to be a multiple of 40 for this printer
    let width = canvas.width;
    let height = canvas.height;
    // canvas.height = height;
    let context = canvas.getContext("2d");
    // context.drawImage(image, 0, 0, canvas.width, canvas.height);
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height).data;

    function getDarkPixel(x, y) {
        // Return the pixels that will be printed black
        let red = imageData[((width * y) + x) * 4];
        let green = imageData[((width * y) + x) * 4 + 1];
        let blue = imageData[((width * y) + x) * 4 + 2];
        return (red + green + blue) > 0 ? 1 : 0;
    }
    
    function getImagePrintData() {
        if (imageData == null) {
            console.log('No image to print!');
            return new Uint8Array([]);
        }
        // Each 8 pixels in a row is represented by a byte
        let printData = new Uint8Array(width / 8 * height + 8);
        let offset = 0;
        // Set the header bytes for printing the image
        printData[0] = 29;  // Print raster bitmap
        printData[1] = 118; // Print raster bitmap
        printData[2] = 48; // Print raster bitmap
        printData[3] = 0;  // Normal 203.2 DPI
        printData[4] = width / 8; // Number of horizontal data bits (LSB)
        printData[5] = 0; // Number of horizontal data bits (MSB)
        printData[6] = height % 256; // Number of vertical data bits (LSB)
        printData[7] = height / 256;  // Number of vertical data bits (MSB)
        offset = 7;
        // Loop through image rows in bytes
        for (let i = 0; i < height; ++i) {
            for (let k = 0; k < width / 8; ++k) {
                let k8 = k * 8;
                //  Pixel to bit position mapping
                printData[++offset] = getDarkPixel(k8 + 0, i) * 128 + getDarkPixel(k8 + 1, i) * 64 +
                            getDarkPixel(k8 + 2, i) * 32 + getDarkPixel(k8 + 3, i) * 16 +
                            getDarkPixel(k8 + 4, i) * 8 + getDarkPixel(k8 + 5, i) * 4 +
                            getDarkPixel(k8 + 6, i) * 2 + getDarkPixel(k8 + 7, i);
            }
        }
        return printData;
    }
    
    function sendNextImageDataBatch(resolve, reject) {
        // Can only write 512 bytes at a time to the characteristic
        // Need to send the image data in 512 byte batches
        if (index + 512 < data.length) {
            device.writeValue(data.slice(index, index + 512)).then(() => {
                index += 512;
                sendNextImageDataBatch(resolve, reject);
            })
            .catch(error => reject(error));
        } else {
        // Send the last bytes
        if (index < data.length) {
            device.writeValue(data.slice(index, data.length)).then(() => {
            resolve();
            })
            .catch(error => reject(error));
        } else {
            resolve();
        }
        }
    }
    
    function sendImageData() {
        index = 0;
        data = getImagePrintData();
        return new Promise(function(resolve, reject) {
            sendNextImageDataBatch(resolve, reject);
        });
    }
    try{
        const result = await sendImageData();
        return result;
    }catch(err){
        console.log(err);
        return null;
    }
}