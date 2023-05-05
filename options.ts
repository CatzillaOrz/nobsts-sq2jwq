function printIngredient(
  quantity: string,
  ingredient: string,
  extra?: string,
) {
  console.log(`${quantity} ${ingredient} ${extra || ''}`);
}

interface User {
  id: string;
  info?: {
    email?: string
  }
}

// bad
function getEmail(user: User): string {
  if (user.info) {
    return user.info.email!
  }
  return ''
}

// good
function getEmailEasy(user: User): string {
  return user?.info?.email ?? "";
}

// good
function addWithCallback(x: number, y: number, callback: () => void) {
  console.log([x, y]);
  callback?.();
}
