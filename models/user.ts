import { Schema, model, models } from "mongoose";

export const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists!'],
        required: [true, 'Email is required!'],

    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"],
    },
    image: {
        type: String,
    }
});
//? in the nextjs since the route will always be called we have to check models for whether the user exists or we have to create a new user 
const User = models.User || model("user", UserSchema);
export default User;