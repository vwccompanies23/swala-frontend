import { GROUP_PERMISSIONS }
from "../data/groupPermissions";

export default function useGroupPermissions(
  role
) {

  return (
    GROUP_PERMISSIONS[
      role
    ] || GROUP_PERMISSIONS.member
  );

}