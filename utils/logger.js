const debug = (!!process.env.APP_DEBUG.length);
const fs = require('fs');

const log = (debugElement) => {
    if (!debug) { return; }
    // else
    fs.writeFile('./debug.log', JSON.stringify(debugElement, null, 2), { flag: 'wx' }, () => 
        console.log('logged in file')
    );
}

module.exports = {
    log
};