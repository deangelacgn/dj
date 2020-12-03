import { userModel } from '../controllers';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { jwtSecretKey, jwtExpiration } from '../settings';

export const loginUser = async (req, res, next) => {
  try {
    const { user_login, password } = req.body;

    const data = await userModel.select(
      'username, email, password',
      ' WHERE username = $1 OR email = $1',
      [user_login],
    );
    const [userData] = data.rows;

    if (userData === undefined) {
      res.status(401).json("Username or password invalid!");
    }

    const validatePassword = await bcrypt.compare(password, userData.password);
    
    if(!validatePassword) {
      res.status(401).json("Username or password invalid!");
    }

    const jwtBody = {
      user_id: userData.user_id,
      username: userData.username,
      email: userData.email,
    };
    const token = jwt.sign(jwtBody, jwtSecretKey, { expiresIn: jwtExpiration });
  
    res.status(200).json({ token: token });

  } catch(error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { user_id, current_password, new_password } = req.body;
    let data = await userModel.select(
      'password',
      ' WHERE user_id = $1',
      [user_id],
    );
    const [userData] = data.rows;

    const validatePassword = await bcrypt.compare(current_password, userData.password);
    
    if(!validatePassword) {
      res.status(401).json("Current password provided is invalid!");
    }
    const passwordHash = await bcrypt.hash(new_password, 10);
    data = await userModel.updatePassword([user_id, passwordHash]);
    res.status(200).json("Successfully updated password!");
  } catch(error) {
    next(error);
  }

};

export const registerUser = async (req, res, next) => {
  try{
    const { username, email, password } = req.body;
    const columns = 'username, email, password';
    const passwordHash = await bcrypt.hash(password, 10);
    const values = [username, email, passwordHash];

    const data = await userModel.registerUser(columns, values);
    const [userData] = data.rows;
    res.status(200).json( {
      message: 'Sign up successfully!',
      user_id: userData.user_id,
      username: userData.username,
      email: userData.email,
    });
  } catch(error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { user_id } = req.body;
    const data = await userModel.deleteUser(user_id);
    const [deletedUser] = data;
    res.status(200).json({ deletedUser });
  } catch(error) {
    next(error);
  }
};