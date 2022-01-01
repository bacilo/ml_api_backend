import { Activity } from '../../models/index.js';
import { geocodingAPIkey, stravaRefreshToken, stravaClientId, stravaClientSecret } from '../../config/index.js';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

let stravaAccessToken
let stravaAccessTokenExpiry

export function isTokenValid(){
  if(stravaAccessToken == null)
    return false;
  return (Date.now() - stravaAccessTokenExpiry) < 0;
}

export async function refreshToken(){
  console.log('refreshToken - 1')
  const util = require('util');
  const request = require('request');
  const options = {
    url: 'https://www.strava.com/oauth/token?client_id='+stravaClientId+'&client_secret='+stravaClientSecret+'&grant_type=refresh_token&refresh_token='+stravaRefreshToken,
  };  
  console.log('refreshToken - 2')
  function callback(error, response, body){
    // console.log(response)
    console.log('refreshToken - callback - 1')
    if (!error && response.statusCode == 200) {
      console.log('refreshToken - callback - 2')
      const info = JSON.parse(body);
      console.log('refreshToken - callback - 3')
      stravaAccessToken = info['access_token'];
      stravaAccessTokenExpiry = info['expires_at']*1000;
      console.log('refreshToken - callback - 4')
    }
    else {
      console.error('error 0:', error); // Print the error if one occurred
    }
  }

  const requestPromise = util.promisify(request.post);
  const response = await requestPromise(options, callback);
  console.log('refreshToken - 4')
  console.log('response', response.body);
}

export async function getActivity(activityId){

  if(!isTokenValid())
    await refreshToken();

  console.log('getActivity - Token is this old: - ' + (Date.now() - stravaAccessTokenExpiry))

  const request = require('request');
  const options = {
    url: 'https://www.strava.com/api/v3/activities/'+activityId,
    headers: {
      'Authorization': 'Bearer '+stravaAccessToken
    }
  };

  function callback(error, response, body) {
    // console.log(body)
    if (!error && response.statusCode == 200) {
      const info = JSON.parse(body);
      Activity.findOne({'activityId': activityId}, function(err, activity){
        activity.start_longitude = info.start_longitude;
        activity.start_latitude = info.start_latitude;
        activity.save(function(err){
          getLocation(activity.activityId);
          if(err) console.error('error 1: ', JSON.parse(body));
        })
      });
    }
    else {
      console.error('error 2:', JSON.parse(body)); // Print the error if one occurred
      // console.error('response:', response); // Print the error if one occurred
      // Errors: 'Record Not Found'
    }
  }
  request(options, callback);
}

export function getLocation(activityId){
  const request = require('request');

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      const info = JSON.parse(body);
      Activity.findOne({'activityId': activityId}, function(err, activity){
        activity.continent = info.data[0].continent;
        activity.country = info.data[0].country;
        activity.locality = info.data[0].locality;
        activity.save(function(err){
          if(err) console.error('error 3: ', err);
        })
      });
    }
    else {
      console.error('error 4:', error); // Print the error if one occurred
    }
  }

  Activity.findOne({'activityId': activityId}, function(err, activity){
    const options = {
      url: 'http://api.positionstack.com/v1/reverse?access_key='+geocodingAPIkey+'&query='+activity.start_latitude+','+activity.start_longitude,
    };  
    request(options, callback);
  });
}
