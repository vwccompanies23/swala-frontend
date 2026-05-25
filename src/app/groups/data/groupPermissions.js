export const GROUP_PERMISSIONS = {

  owner: {

    canDeleteUsers: true,
    canAddAdmins: true,
    canRemoveAdmins: true,
    canEditGroup: true,
    canDeleteMessages: true,
    canLockGroup: true,
    canInviteUsers: true,
    canPinMessages: true,

  },

  admin: {

    canDeleteUsers: true,
    canAddAdmins: false,
    canRemoveAdmins: false,
    canEditGroup: true,
    canDeleteMessages: true,
    canLockGroup: true,
    canInviteUsers: true,
    canPinMessages: true,

  },

  moderator: {

    canDeleteUsers: false,
    canAddAdmins: false,
    canRemoveAdmins: false,
    canEditGroup: false,
    canDeleteMessages: true,
    canLockGroup: false,
    canInviteUsers: true,
    canPinMessages: true,

  },

  member: {

    canDeleteUsers: false,
    canAddAdmins: false,
    canRemoveAdmins: false,
    canEditGroup: false,
    canDeleteMessages: false,
    canLockGroup: false,
    canInviteUsers: false,
    canPinMessages: false,

  },

};