export const isUserName = (str) => {
  const result = str.match(/^[a-zA-Z0-9]+$/);
  console.log(str)
  if (result == null) return false;
  return true;
}
