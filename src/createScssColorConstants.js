const palette = require('./muiBasePalette').palette;

for (var prop in palette) {
    console.log(`$${prop}: ${palette[prop]};`);
}