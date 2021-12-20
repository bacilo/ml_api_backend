import { Comment } from '../../../models/index.js';
import { errorHelper, logger, getText } from '../../../utils/index.js';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export default async (req, res) => {
  try{
    const Perspective = require('perspective-api-client');
    const perspective = new Perspective({apiKey: perspectiveAPIkey});
    const result = await perspective.analyze(req.query.text);
    var toxicity = result['attributeScores']['TOXICITY']['summaryScore']['value'];
  } catch(err){
    console.log(err)
    return res.status(400).json(errorHelper('00055', req, err.message));
  }

  let comment = new Comment({
    text: req.query.text,
    toxicity: toxicity
  });

  comment = await comment.save().catch((err) => {
    return res.status(500).json(errorHelper('00034', req, err.message))
  });

  return res.status(200).json({
    resultMessage: { toxicity: toxicity},
    resultCode: '00004' // Figure out the right  resultCode here
  });
};
