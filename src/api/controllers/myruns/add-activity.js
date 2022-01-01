import { Activity } from '../../../models/index.js';
import { errorHelper, logger, getText, getActivity } from '../../../utils/index.js';

// This is the service to be called by Strava when new activities appear
export default async (req, res) => {
  if(req.query.aspect_type == "create" && req.query.object_type == "activity"){
    Activity.findOne({'activityId':req.query.object_id}, async function(err, activity){
      if(err) return next(err);
      if(!activity){
        let activity = new Activity({
          activityId: req.query.object_id
        });
        activity = await activity.save().catch((err) => {
          return res.status(500).json(errorHelper('00034', req, err.message))
        });
        getActivity(activity.activityId);
        return res.status(200).json({
          'added new activity: ': req.query.object_id
        });
      }
      else{
        getActivity(activity.activityId);
        return res.status(200).json({
          'updated activity: ': activity.activityId
        });
      }
    });
  }
  else{
    return res.status(200).json({
      'not a new activity': req.query.object_id
    });
  }
}