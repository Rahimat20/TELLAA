const pool = require('./db')
const bcrypt = require('bcrypt')

async function seed() {
  const ownerPassword = await bcrypt.hash('owner123', 10)
  const staffPassword = await bcrypt.hash('staff123', 10)

  await pool.query(`
    INSERT INTO business_users (email, password, role)
    VALUES 
      ('owner@kadgym.com', $1, 'owner'),
      ('staff@kadgym.com', $2, 'staff')
    ON CONFLICT (email) DO NOTHING;
  `, [ownerPassword, staffPassword])

  console.log('Seeded business users successfully')
  process.exit()
}

seed().catch((err) => {
  console.error('Seed error:', err)
  process.exit(1)
})