const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env');
const examplePath = path.join(__dirname, '..', '.env.example');

if (!fs.existsSync(envPath)) {
  if (fs.existsSync(examplePath)) {
    fs.copyFileSync(examplePath, envPath);
    console.log('✓ Created .env from .env.example for Vercel/CI build environment');
  } else {
    fs.writeFileSync(
      envPath,
      'DATABASE_URL="file:./dev.db"\nADMIN_EMAIL="admin@struggleofstudents.org"\nADMIN_PASSWORD="admin_ss_secret_2026"\nJWT_SECRET="ss_super_secure_jwt_secret_token_genz_2026_xyz"\n'
    );
    console.log('✓ Created fallback .env for Vercel build environment');
  }
}

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = 'file:./dev.db';
}
