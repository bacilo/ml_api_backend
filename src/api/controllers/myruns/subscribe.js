import { errorHelper, logger, getText } from '../../../utils/index.js';

export default async (req, res) => {
  console.log(req.query['hub.challenge'])
  return res.status(200).json({
    'hub.challenge': req.query['hub.challenge']
  });
};