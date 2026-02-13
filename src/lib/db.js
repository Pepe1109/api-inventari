import mongoose from 'mongoose';

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB conectada (Inventari)');
  } catch (err) {
    console.error('❌ Error conexión Mongo:', err);
    process.exit(1);
  }
}