import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const commentSchema = new Schema({
	text:{
		type: String,
		required: true
	},
	unsubstantial:{
		type: Number,
	},
	spam:{
		type: Number,
	},
	toxicity:{
		type: Number,
	},
	severe_toxicity:{
		type: Number,
	},
	threat:{
		type: Number,
	},
	insult:{
		type: Number,
	},
	profanity:{
		type: Number,
	},
	identity_attack:{
		type: Number,
	},
	from_speech:{
		type: Boolean,
	},
	client_ip:{
		type: String,
	}
},
	{
		timestamps: true
	});

const Comment = model('Comment', commentSchema)
export default Comment
