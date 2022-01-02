import { Activity } from '../../../models/index.js';
import { errorHelper, logger } from '../../../utils/index.js';

export default async (req, res) => {
  let all_places= JSON.parse('{"places":[]}');
  const localities = await Activity.find().distinct('locality');
  for await (const locality of localities) {
    const place = await Activity.findOne({locality: locality});
    console.log(locality);
    // console.log(place['_id']);
    all_places['places'].push(place);
    // console.log(JSON.parse(place));
  }
  console.log(all_places);
  return res.status(200).json({
    resultMessage: { 
      places: all_places,
    },
    resultCode: '00004' // Figure out the right  resultCode here
  });
  console.log('4')
}