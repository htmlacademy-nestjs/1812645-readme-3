import { plainToInstance, ClassConstructor } from 'class-transformer';

export function fillObject<T, V> (someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});
}

export function getMongoConnectionString({username, password, host, port, databaseName, authDatabase}): string {
  console.log(username, password, host, port, databaseName, authDatabase);
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
}
