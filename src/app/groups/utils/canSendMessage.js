export default function canSendMessage({
  locked,
  role,
}) {

  if (!locked)
    return true;

  return (
    role === "owner" ||
    role === "admin"
  );

}