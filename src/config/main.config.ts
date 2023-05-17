import *  as path from 'path';
import * as fs from 'fs';


// export dbFolder: path.resolve(__dirname, '../../db/'),

// export default {
//     dbFolder: path.resolve(__dirname, '../../db/'),
//     svgFolder: path.resolve(dbFolder, 'svg'),
//     dbDumpFile: path.resolve(dbFolder, 'dump.json'),
// }

export const dbFolder = path.resolve(__dirname, '../../db/');
export const dbDumpFile = path.resolve(dbFolder, 'dump.json');
export const existingData = JSON.parse(fs.readFileSync(dbDumpFile, 'utf-8'));
