db = db.getSiblingDB('appdb')

db.users.insertMany([
  { name: 'Ada Lovelace', email: 'ada@example.com', role: 'admin' },
  { name: 'Alan Turing', email: 'alan@example.com', role: 'user' },
  { name: 'Grace Hopper', email: 'grace@example.com', role: 'user' },
  { name: 'Linus Torvalds', email: 'linus@example.com', role: 'user' },
])
