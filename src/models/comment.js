import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const commentSchema = new Schema({
	text:{
		type: String,
		required: true
	},
	toxicity:{
		type: Number,
	}
},
	{
		timestamps: true
	});

const Comment = model('Comment', commentSchema)
export default Comment
