import RoleId from 'api/roles';
import auth, { onAuthStateChanged } from '../auth';
import NotLoaded from 'NotLoaded';

import zipObject from 'lodash/zipObject';

import FirestoreContainer from 'unstated-ext/FirestoreContainer';


export default class Devices extends FirestoreContainer {
  static n = 'devices';

  get actions() {
    return {
      setCommand: (deviceId, command, commandArgs) => {
        const upd = { command };
        if (commandArgs !== undefined) {
          upd.commandArgs = commandArgs;
        }
        this.doc(deviceId).update(upd);
      },

      getCommand: (deviceId) => {
        if (!this.state.byId) {
          return NotLoaded;
        }

        const device = this.state.byId[deviceId];
        if (!device || device.command === undefined) {
          return null;
        }

        return device.command;
      },

      getStatus: (deviceId) => {
        if (!this.state.byId) {
          return NotLoaded;
        }

        const device = this.state.byId[deviceId];
        if (!device || device.status === undefined) {
          return null;
        }

        return device.status;
      },

      getNextStatus: (deviceId) => {
        // command is going to set the new status
        let status = this.getCommand(deviceId);
        //console.log('getNextStatus', this, status);
        if (status === null) {
          // no command issued, just use the current status instead
          status = this.getStatus(deviceId);
        }
        return status;
      },

      queueCommand: (deviceId, command) => {
        // TODO: command queue
      }
    }
  };

  get values() {
    return {
      all: {
        ref: this.collection,
        mergeRoot: async snap => {
          return Object.assign(snap, {
            byId: this.snapToById(snap)
          });
        }
      }
    };
  };
}