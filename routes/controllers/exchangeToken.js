import Token from '../../database/models/Token.js';

const exchangeToken = async (req, res) => {
  try {
    if (req.method === 'GET') {
      const tokens = await Token.find({});
      return res.status(200).json({ tokens });
    } else if (req.method === 'POST') {
      const { tokenData } = req.body;
      const { access_token, scope, token_type, id_token, expiry_date } =
        tokenData;
      await Token.deleteMany({});
      const token = new Token({
        access_token,
        scope,
        token_type,
        id_token,
        expiry_date,
      });
      await token.save();
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ error: 'Invalid request method' });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

export default exchangeToken;
