// Vercel serverless function: password-protected playbook data.
// The question bank never ships in the public JS bundle; it is returned only after
// the password check passes. Change the password without a code change by setting
// PLAYBOOK_PASSWORD in the Vercel project settings (Environment Variables).
const crypto = require('crypto');
const data = require('../lib/playbook-data.js');

// sha256 of the default password
const DEFAULT_HASH = '6269a075ff630b7e3868eb7b9bd7ad9dd11033cf78761ec6eb22f76a13f77a22';

function sha256(value) {
  return crypto.createHash('sha256').update(String(value), 'utf8').digest('hex');
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (err) { body = {}; }
  }
  const supplied = body && typeof body.password === 'string' ? body.password : '';
  const expected = process.env.PLAYBOOK_PASSWORD ? sha256(process.env.PLAYBOOK_PASSWORD) : DEFAULT_HASH;

  const a = Buffer.from(sha256(supplied));
  const b = Buffer.from(expected);
  const ok = a.length === b.length && crypto.timingSafeEqual(a, b);
  if (!ok) {
    return res.status(401).json({ error: 'Wrong password' });
  }

  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({ sections: data.sections, mockStandard: data.mockStandard });
};
