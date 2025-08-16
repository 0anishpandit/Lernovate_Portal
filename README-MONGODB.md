# MongoDB Setup for Lernovate

This document explains how to set up MongoDB for the Lernovate login system.

## Environment Variables

Add the following environment variable to your project:

\`\`\`env
MONGODB_URI=mongodb://localhost:27017/lernovate
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lernovate

JWT_SECRET=your-super-secret-jwt-key-change-in-production
\`\`\`

## Local MongoDB Setup

1. **Install MongoDB locally:**
   \`\`\`bash
   # macOS with Homebrew
   brew install mongodb-community

   # Ubuntu/Debian
   sudo apt-get install mongodb

   # Windows - Download from https://www.mongodb.com/try/download/community
   \`\`\`

2. **Start MongoDB service:**
   \`\`\`bash
   # macOS
   brew services start mongodb-community

   # Ubuntu/Debian
   sudo systemctl start mongod

   # Windows
   net start MongoDB
   \`\`\`

## MongoDB Atlas Setup (Cloud)

1. Create account at https://www.mongodb.com/atlas
2. Create a new cluster
3. Create a database user
4. Whitelist your IP address
5. Get connection string and add to MONGODB_URI

## Testing the Connection

Visit `/api/test/mongodb` to test the MongoDB connection and see initialized users.

## Default User Accounts

The system automatically creates these default accounts:

| Email | Password | Role |
|-------|----------|------|
| superadmin@lernovate.com | admin123 | Super Admin |
| admin@lernovate.com | admin123 | Admin |
| teacher@lernovate.com | teacher123 | Teacher |
| student@lernovate.com | student123 | Student |
| principal@lernovate.com | principal123 | Principal |

## Database Schema

### Users Collection

\`\`\`javascript
{
  _id: ObjectId,
  email: String (unique, lowercase),
  password: String (bcrypt hashed),
  name: String,
  role: String,
  permissions: [String],
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

## Security Notes

- Passwords are hashed using bcryptjs with 12 salt rounds
- JWT tokens are stored in HttpOnly cookies
- Default passwords should be changed in production
- Use strong JWT_SECRET in production
