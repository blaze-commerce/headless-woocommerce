import { Client } from 'typesense';

import TS_CONFIG from '@src/lib/typesense/config';

export const c = new Client(TS_CONFIG.server);

export default c;
