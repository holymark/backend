import { Schema , model} from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export default model('User', userSchema);
