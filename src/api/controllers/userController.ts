// TODO: create the following functions:
// - userGet - get user by id
// - userListGet - get all users
// - userPost - create new user. Remember to hash password
// - userPutCurrent - update current user
// - userDeleteCurrent - delete current user
// - checkToken - check if current user token is valid: return data from req.user. No need for database query

import {Request, Response, NextFunction} from 'express';
import CustomError from '../../classes/CustomError';
import {User} from '../../interfaces/User';
import userModel from '../models/userModel';
import {validationResult} from 'express-validator';
import bcrypt from 'bcrypt';
import DBMessageResponse from '../../interfaces/DBMessageResponse';

const userGet = async (
  req: Request<{id: string}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      throw new CustomError('User not found', 404);
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const userListGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

const userPost = async (
  req: Request<{}, {}, User>,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const messages = errors
        .array()
        .map((error) => `${error.msg}: ${error.param}`)
        .join(', ');
      next(new CustomError(messages, 400));
      return;
    }

    const user = req.body;
    user.password = await bcrypt.hash(user.password, 10);

    const newUser = await userModel.create(user);
    const response: DBMessageResponse = {
      message: 'User created successfully',
      data: {
        _id: newUser._id,
        user_name: newUser.user_name,
        email: newUser.email,
      },
    };

    res.json(response);
  } catch (error) {
    next(new CustomError('User creation failed', 500));
  }
};

const userPutCurrent = async (
  req: Request<{}, {}, User>,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const messages = errors
        .array()
        .map((error) => `${error.msg}: ${error.param}`)
        .join(', ');
      next(new CustomError(messages, 400));
      return;
    }

    const user = req.body;
    user.password = await bcrypt.hash(user.password, 10);

    const updatedUser = await userModel.findByIdAndUpdate(
      (req.user as User)._id,
      user,
      {
        new: true,
      }
    );

    if (updatedUser) {
      const response: DBMessageResponse = {
        message: 'User updated successfully',
        data: {
          _id: updatedUser._id,
          user_name: updatedUser.user_name,
          email: updatedUser.email,
        },
      };

      res.json(response);
    }
  } catch (error) {
    next(new CustomError('User update failed', 500));
  }
};

const userDeleteCurrent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletedUser = await userModel.findByIdAndDelete(
      (req.user as User)._id
    );

    if (deletedUser) {
      const response: DBMessageResponse = {
        message: 'User deleted successfully',
        data: {
          _id: deletedUser._id,
          user_name: deletedUser.user_name,
          email: deletedUser.email,
        },
      };

      res.json(response);
    }
  } catch (error) {
    next(new CustomError('User deletion failed', 500));
  }
};

const checkToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = req.user as User;

    const response: DBMessageResponse = {
      message: 'Token is valid',
      data: {
        _id: user._id,
        user_name: user.user_name,
        email: user.email,
      },
    };

    res.json(response);
  } catch (error) {
    next(new CustomError('Token is invalid', 500));
  }
};

export {
  userGet,
  userListGet,
  userPost,
  userPutCurrent,
  userDeleteCurrent,
  checkToken,
};
