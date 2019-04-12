import makeProxy from './SerializeAccessProxy';
import { fs } from 'api/firebase';

it('does collections + documents', () => {
  const p = makeProxy(fs);

  expect(p.__result).toBe(fs);
  expect(p.__serialized).toEqual('');

  p.collection('users');
  expect(p.__result.constructor.name).toEqual('CollectionReference');
  expect(p.__serialized).toEqual('collection["users"]');

  p.doc('123');
  expect(p.__result.constructor.name).toEqual('DocumentReference');
  expect(p.__serialized).toEqual('collection["users"]doc["123"]');
});


it('does queries', () => {
  // console.log(fs.collection('users').doc('123').path);
  // console.log(fs.collection('users').where('title', '==', 'abc').path);
  const p = makeProxy(fs);

  expect(p.__result).toBe(fs);
  expect(p.__serialized).toEqual('');

  p.collection('users').where('title', '==', 'abc').orderBy('level');

  expect(p.__result.constructor.name).toEqual('Query');
  expect(p.__serialized).toEqual('collection["users"]where["title","==","abc"]orderBy["level"]');
});
