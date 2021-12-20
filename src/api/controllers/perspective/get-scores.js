import { Comment } from '../../../models/index.js';
import { errorHelper, logger, getText } from '../../../utils/index.js';

import { perspectiveAPIkey } from '../../../config/index.js'

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export default async (req, res) => {
  try{
    const Perspective = require('perspective-api-client');
    const perspective = new Perspective({apiKey: perspectiveAPIkey});

    const result = await perspective.analyze(
      req.query.text, 
      {attributes: [
        'unsubstantial',
        'spam',
        'toxicity',
        'severe_toxicity',
        'threat',
        'insult',
        'profanity',
        'identity_attack']});
    var unsubstantial = result['attributeScores']['UNSUBSTANTIAL']['summaryScore']['value'];
    var spam = result['attributeScores']['SPAM']['summaryScore']['value'];
    var toxicity = result['attributeScores']['TOXICITY']['summaryScore']['value'];
    var severe_toxicity = result['attributeScores']['SEVERE_TOXICITY']['summaryScore']['value'];
    var threat = result['attributeScores']['THREAT']['summaryScore']['value'];
    var insult = result['attributeScores']['INSULT']['summaryScore']['value'];
    var profanity = result['attributeScores']['PROFANITY']['summaryScore']['value'];
    var identity_attack = result['attributeScores']['IDENTITY_ATTACK']['summaryScore']['value'];
  } catch(err){
    console.log(err)
    return res.status(400).json(errorHelper('00055', req, err.message));
  }

  let comment = new Comment({
    text: req.query.text,
    unsubstantial: unsubstantial,
    spam: spam,
    toxicity: toxicity,
    severe_toxicity: severe_toxicity,
    threat: threat,
    insult: insult,
    profanity: profanity,
    identity_attack: identity_attack
  });

  comment = await comment.save().catch((err) => {
    return res.status(500).json(errorHelper('00034', req, err.message))
  });

  return res.status(200).json({
    resultMessage: { 
      unsubstantial: unsubstantial,
      spam: spam,
      toxicity: toxicity,
      severe_toxicity: severe_toxicity,
      threat: threat,
      insult: insult,
      profanity: profanity,
      identity_attack: identity_attack
    },
    resultCode: '00004' // Figure out the right  resultCode here
  });
};
