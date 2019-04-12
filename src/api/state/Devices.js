import RoleId from 'api/roles';
import auth, { onAuthStateChanged } from '../auth';

import zipObject from 'lodash/zipObject';

import FirestoreContainer from 'unstated-ext/FirestoreContainer';


export default class Devices extends FirestoreContainer {
  actions = {
    setCommand: (deviceId, command, commandArgs) => {
      const upd = { command };
      if (commandArgs !== undefined) {
        upd.commandArgs = commandArgs;
      }
      this.doc(deviceId).update(upd);
    },

    queueCommand: (deviceId, command) => {
      // TODO: command queue
    }
  };

  get values() {
    return {
      all: {
        ref: this.collection,
        map: async snap => {
          return Object.assign(snap, {
            byId: this.snapToById(snap)
          });
        }
      }
    };
  };

  constructor() {
    super('devices');
  }
}