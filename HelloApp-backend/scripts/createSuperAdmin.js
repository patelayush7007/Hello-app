import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';

dotenv.config();
 const mongoURI = 'mongodb+srv://patelayush7007:ayushmongo7007@appcluster.k8ighkg.mongodb.net/?retryWrites=true&w=majority&appName=AppCluster'
async function createAdmin() {
  await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const hashedPassword = await bcrypt.hash('Admin@123', 10); 

  const admin = new User({
    name: 'Super Admin',
    email: 'admin@hello.com',
    password: hashedPassword,
    role: 'admin',
  });

  await admin.save();
  console.log('✅ Super admin created');
  process.exit();
}

createAdmin().catch((err) => {
  console.error('❌ Error creating admin:', err);
  process.exit(1);
});
