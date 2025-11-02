import mongoose from "mongoose";

interface userI {
  _id?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new mongoose.Schema<userI>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

// //in nodejs/express we have make model like this:
// const User = mongoose.model('User',userSchema);
// export default User;
// but this method is not good for next js. if we write like this nextjs store that model in an object . when we call this model again. next js tell us this model already exist dont build this model again and give us error.

//So we should make like this:
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
