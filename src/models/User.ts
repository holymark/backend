import { Document, Schema , model} from "mongoose";
import bcrypt from "bcryptjs"


export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

const userSchema = new Schema({
  isAdmin: {
    type: Boolean,
    default: false,
  },
  email: {type: String, required:true},
  password:  {type: String, required:true},
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});



export default model<IUser>('User', userSchema);
