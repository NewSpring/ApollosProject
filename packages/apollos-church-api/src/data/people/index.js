import { Person } from '@apollosproject/data-connector-rock';
import schema from './schema';
import resolver from './resolver';

const { dataSource } = Person;

export { schema, resolver, dataSource };
