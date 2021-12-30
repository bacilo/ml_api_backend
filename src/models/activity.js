import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const activitySchema = new Schema({
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
	}
},
	{
		timestamps: true
	});

const Activity = model('Activity', activitySchema)
export default Activity
