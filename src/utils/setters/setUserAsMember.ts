import { firestoredb } from '../../lib';
import { toast } from 'react-toastify';
import handleFirebaseError from '../general/handleFirebaseError';

import { GroupUser, Group, Roles } from '../../global/types';

const setUserAsMember = async (user: GroupUser, group: Group, setGroup: (group: Group | null) => void) => {
  try {
    const userCopy: GroupUser = JSON.parse(JSON.stringify(user));
    const groupCopy: Group = JSON.parse(JSON.stringify(group));
    const userRef = firestoredb.doc(firestoredb.db, 'users', user.id);
    const groupRef = firestoredb.doc(firestoredb.db, 'groups', group.id);
    const groupIndex = userCopy.groups.findIndex(uGroup => uGroup.id === group.id);
    const userIndex = groupCopy.users.findIndex(gpUser => gpUser.id === group.id);
    const adminIndex = groupCopy.admins.findIndex(adm => adm.id === user.id);
    userCopy.groups[groupIndex].role = Roles.Member;
    userCopy.role = Roles.Member;
    groupCopy.users.splice(userIndex, 1, userCopy);
    groupCopy.admins.splice(adminIndex, 1);
    
    await firestoredb.updateDoc(userRef, {
      groups: userCopy.groups,
    });
    await firestoredb.updateDoc(groupRef, {
      users: groupCopy.users,
      admins: groupCopy.admins,
    });

    setGroup(groupCopy);
    toast(`${user.name} is now a member!`);
  } catch (err) {
    handleFirebaseError(err);
  }
}

export default setUserAsMember;