import zipObject from 'lodash/zipObject';
import isString from 'lodash/isString';

export const RoleId = {
  Guest: 0,
  User: 1,
  Admin: 2
};

export const RoleIds = Object.values(RoleId);
export const RoleNames = Object.keys(RoleId);

export const RoleNameById = zipObject(RoleIds, RoleNames);

export function getRoleName(roleId) {
  roleId = Math.min(roleId, Math.max(...RoleIds));
  return RoleNameById[roleId] || RoleNameById[RoleId.Guest];
}

export function hasRole(role, referenceRoleOrName) {
  if (isString(referenceRoleOrName)) {
    if (!RoleId.hasOwnProperty(referenceRoleOrName)) {
      throw new Error('invalid role name: ' + referenceRoleOrName);
    }
    //console.log(role, RoleId[referenceRoleOrName], role >= RoleId[referenceRoleOrName]);
    return role >= RoleId[referenceRoleOrName];
  }
  return role >= referenceRoleOrName;
}

export default RoleId;