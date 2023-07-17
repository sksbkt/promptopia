import mongoose, { Schema, model, models } from "mongoose";
import { UserSchema } from "./user"
const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        //? one to many relationship. a User can create multiple prompts
        ref: 'User',
    },
    prompt: {
        type: String,
        required: [true, 'prompt is required'],

    },
    tag: {
        type: String,
        required: [true, 'tag is required']
    }
});
//? in the nextjs since the route will always be called we have to check models for whether the Prompt exists or we have to create a new Prompt 
const Prompt = models.Prompt || model("Prompt", PromptSchema);
//? we are using mongoose models here so we can register User for promptSchema otherwise we cant populate the response object
mongoose.model("User", UserSchema);
export default Prompt;