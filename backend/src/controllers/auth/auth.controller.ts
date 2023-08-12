import { NextFunction, Request, Response } from "express";
import mongoose, { Types } from "mongoose";
import { asyncHandler } from "../../middleware/async.middleware";
import Restaurant, { IRestaurant } from "../../models/Restaurant.model";
import Role from "../../models/Role.model";
import User, { IUser } from "../../models/User.model";
import { ErrorResponse } from "../../utils/errorResponse";

const getRoleId = async (slug: string) => {
  try {
    const roleId = await Role.findOne({ slug });
    return roleId?._id
  } catch (err) {
    return null
  }
}

// validate credentials***************************
const validateCredentials = (
  email: string,
  password: string,
  next: NextFunction
) => {
  if (!email || !password) {
    return next(new ErrorResponse(`Email/Password hasn't been provided`, 400));
  }
};

// register user**************************
const registerUser = async (userModel: any, email: string, password: string, name: string, role?: Types.ObjectId) => {
  console.log("WTF", {
    name,
    email,
    password,
    role: new mongoose.Types.ObjectId(role)
  })
  const user = await userModel.create({
    name,
    email,
    password,
    role: new mongoose.Types.ObjectId(role)
  });

  const { token, options } = await sendTokenResponse(user);
  return { token, options };
};

//User authentication****************************

export const userLoginHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { password, email } = req.body;

  //credentials should not be empty
  validateCredentials(email, password, next);

  //check if user exists
  const user = await User.findOne({ email }).select(["password"]);

  if (!user) {
    return next(
      new ErrorResponse(
        "User does not exist. Please register to continue.",
        404
      )
    );
  }

  const isMatch = await user.matchedPasswords(password);
  if (!isMatch) {
    next(new ErrorResponse("Password entered is incorrect", 400));
  }

  //send token if all goes well
  const { token, options } = await sendTokenResponse(user);

  res.cookie("token", token, options).send("Logged In");
}
);

export const userRegisterHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { name, password, email } = req.body;
  const roleId = await getRoleId("user");
  const { token, options } = await registerUser(User, email, password, name, roleId as Types.ObjectId);
  res.cookie("token", token, options).send("User Registered");
}
);

// Restaurant authentication**************************

export const restaurantLoginHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  validateCredentials(email, password, next);

  // const restaurantUser = await Restaurant.findOne({ email });
  const restaurantUser = await Restaurant.restaurantBasicDetail(email)

  if (!restaurantUser) {
    return next(new ErrorResponse(`User does not exist. Please register to continue.`, 404));
  }
  const { token, options } = await sendTokenResponse(restaurantUser);
  res.cookie("token", token, options).send(restaurantUser);
}
);

export const restaurantRegisterHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, name } = req.body;
  const roleId = await getRoleId("restaurant");
  const { token, options } = await registerUser(Restaurant, email, password, name, roleId as Types.ObjectId);
  res.cookie("token", token, options).send("Registered Restaurant");
})

// logout handler******************************

export const logoutStateHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie("token", {
    httpOnly: true,
    expires: new Date(0)
  })
  res.send('Logged Out!')
})

export const getUserInfoHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { userType } = req.params;
  console.log(userType)
  let user;
  let resData;
  switch (userType) {
    case "user": user = await User.findById(req.userId);
      resData = { name: user?.name, email: user?.email, id: user?._id, userType };
      break;
    case "restaurant": user = await Restaurant.findById(req.userId);
      resData = { name: user?.name, email: user?.email, id: user?._id, isDetailsSubmitted: user?.isDetailsSubmitted, status: user?.status };
      break;
    default: return null
  }
  if (user) {
    return res.send(resData)
  } else {
    return next(new ErrorResponse('User not found', 404))
  }
})

// cookie maker***********
const sendTokenResponse = async (user: IUser | IRestaurant, cookieData?: any) => {
  const token = await user.getSignedJWTToken();
  const options = {
    httpOnly: true
  };
  return { token, options };
};
