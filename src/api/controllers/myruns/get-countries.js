import { Activity } from '../../../models/index.js';
import { errorHelper, logger } from '../../../utils/index.js';

// This is the service to be called by Strava when new activities appear
export default async (req, res) => {
  const countries = await Activity.find().distinct('country');
  return res.status(200).json({
    resultMessage: { 
      countries: countries,
    },
    resultCode: '00004' // Figure out the right  resultCode here
  });
  console.log('4')
}