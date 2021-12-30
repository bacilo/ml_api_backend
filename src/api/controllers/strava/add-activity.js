import { Activity } from '../../../models/index.js';
import { errorHelper, logger, getText } from '../../../utils/index.js';

export default async (req, res) => {
  console.log('new activity')
  console.log(req)
  if(req.query.aspect_type == "create" && req.query.object_type == "activity"){
    return res.status(200).json({
      'new activity': req.query.object_id
    });
  }
  else{
    return res.status(200).json({
      'not a new activity': req.query.aspect_type
    });
  }
};