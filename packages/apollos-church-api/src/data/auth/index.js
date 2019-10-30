import { Auth } from '@apollosproject/data-connector-rock';
import dataSource from './data-source';

const { schema, resolver } = Auth;

export { schema, resolver, dataSource };
