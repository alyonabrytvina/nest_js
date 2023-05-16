import path from 'path';
import dbFolder from '../../db/';

// export dbFolder: path.resolve(__dirname, '../../db/'),

export default {
    dbFolder: path.resolve(__dirname, '../../db/'),
    svgFolder: path.resolve(dbFolder, 'svg'),
    dbDumpFile: path.resolve(dbFolder, 'dump.json'),
}
