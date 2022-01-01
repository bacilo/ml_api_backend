import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const activitySchema = new Schema({
	activityId:{
		type: String,
    	required: true,
    	unique: true,
	},
	start_latitude:{
		type: Number,
	},
	start_longitude:{
		type: Number,
	},	
	continent:{
		type: String,
	},
	country:{
		type: String,
	},
	locality:{
		type: String,
	}
},
	{
		timestamps: true
	});

const Activity = model('Activity', activitySchema)
export default Activity
