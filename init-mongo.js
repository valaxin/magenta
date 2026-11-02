db = db.getSiblingDB('appdb');

db.users.insertMany([
  { name: 'default', email: 'default@local', password: 'nopass', role: 'admin' },
  { name: 'john', email: 'john@local', password: 'nopass', role: 'user' },
  { name: 'jane', email: 'jane@local', password: 'nopass', role: 'user' },
  { name: 'michael', email: 'michael@local', password: 'nopass', role: 'user' },
  { name: 'sarah', email: 'sarah@local', password: 'nopass', role: 'user' },
  { name: 'david', email: 'david@local', password: 'nopass', role: 'user' },
  { name: 'emma', email: 'emma@local', password: 'nopass', role: 'user' },
  { name: 'robert', email: 'robert@local', password: 'nopass', role: 'user' },
  { name: 'olivia', email: 'olivia@local', password: 'nopass', role: 'user' },
  { name: 'james', email: 'james@local', password: 'nopass', role: 'user' },
  { name: 'sophia', email: 'sophia@local', password: 'nopass', role: 'user' },
  { name: 'william', email: 'william@local', password: 'nopass', role: 'user' },
  { name: 'amelia', email: 'amelia@local', password: 'nopass', role: 'user' },
  { name: 'daniel', email: 'daniel@local', password: 'nopass', role: 'user' },
  { name: 'charlotte', email: 'charlotte@local', password: 'nopass', role: 'user' },
  { name: 'matthew', email: 'matthew@local', password: 'nopass', role: 'user' },
  { name: 'isabella', email: 'isabella@local', password: 'nopass', role: 'user' },
  { name: 'joseph', email: 'joseph@local', password: 'nopass', role: 'user' },
  { name: 'mia', email: 'mia@local', password: 'nopass', role: 'user' },
  { name: 'andrew', email: 'andrew@local', password: 'nopass', role: 'user' },
  { name: 'grace', email: 'grace@local', password: 'nopass', role: 'user' },
  { name: 'thomas', email: 'thomas@local', password: 'nopass', role: 'user' },
  { name: 'lucas', email: 'lucas@local', password: 'nopass', role: 'user' },
  { name: 'ella', email: 'ella@local', password: 'nopass', role: 'user' },
  { name: 'benjamin', email: 'benjamin@local', password: 'nopass', role: 'user' }
]);