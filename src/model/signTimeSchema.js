// model.js 
import mongoose,{Schema} from "mongoose";

// Define schema for sign-in and sign-out times
const SignTimeSchema = new Schema({
  type: { type: String, enum: ['sign-in', 'sign-out'], required: true },
  time: { type: Date, default: Date.now },

});

// test
SignTimeSchema.set('toObject',{virtuals:true})
SignTimeSchema.set("toJSON",{virtuals:true})

SignTimeSchema.virtual('User',{
  "ref":"User",
  localField:'_id',
  foreignField:' attendence'
})

// Create model from schema
 export const SignTime = mongoose.model('SignTime', SignTimeSchema);
