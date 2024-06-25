import { expressjwt } from 'express-jwt';
import { getCustomer, getCustomerByEmail } from './customers.js';
// Your other code in auth.js
import jwt from 'jsonwebtoken';

const secret = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64');

export const authMiddleware = expressjwt({
  algorithms: ['HS256'],
  credentialsRequired: false,
  secret,
});

export async function handleLogin(req, res) {
  const { email, password } = req.body;
  const customer = await getCustomerByEmail(email);
  if (!customer || customer.password !== password) {
    res.sendStatus(401);
  } else {
    const claims = { sub: customer.id, email: customer.email };
    const token = jwt.sign(claims, secret);
    res.json({ token });  
  }
}