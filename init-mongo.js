db = db.getSiblingDB('appdb')

db.users.insertMany([
  { name: 'default', email: 'default@local', password: 'nopass', role: 'admin' },
])
