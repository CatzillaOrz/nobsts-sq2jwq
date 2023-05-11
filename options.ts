function printIngredient(
  quantity: string,
  ingredient: string,
  extra?: string,
) {
  console.log(`${quantity} ${ingredient} ${extra || ''}`);
}

printIngredient("1c", "Flour")
printIngredient("2C", "Flour", "sth more")

interface User {
  id: string;
  info?: {
    email?: string
  }
}

// bad
function getEmail(user: User): string {
  if (user.info) {
    return user.info.email! // use ! is a bad practic
  }
  return ''
}

// optional fields
// good
function getEmailEasy(user: User): string {
  return user?.info?.email ?? "";
}

// optional callback
function addWithCallback(x: number, y: number, callback?: () => void) {
  console.log([x, y]);
  callback?.();
}

