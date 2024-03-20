import {asyncHandler} from "../utils/asynHandler.js"
import {ApiError} from "../utils/apiError.js"
import {User} from "../models/user.model.js"
import {uploadFileOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res)=> {
  const {username, fullname, password, email} = req.body
  // console.log("email: ", email);
  if(
    [username, fullname, password, email].some((fields)=> fields?.trim() === "" )
  ){
    throw new ApiError(400, "All Fields Required")
  }

  const existingUser = await User.findOne({ $or: [{username}, {email}] })
  if(existingUser){
    throw new ApiError(409, "User or email Aready Exist")
  }
  const avatarLocalPath = req.files?.avatar[0]?.path;
  //const coverImageLocalPath = req.files?.coverImage[0]?.path;

  let coverImageLocalPath;
  if (req.files&& Array.isArray(req.files.coverImage)&& req.files.coverImage.length > 0) {
    coverImageLocalPath = req.files.coverImage[0].path
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar Image is Required")
  }
  const avatar =  await uploadFileOnCloudinary(avatarLocalPath);
  const coverImage = await uploadFileOnCloudinary(coverImageLocalPath);
  if(!avatar){
    throw new ApiError(400, "Avatar Image is Required")
  }
 const user = await User.create({
    fullname,
    password,
    username: username.toLowerCase(),
    email,
    avatar: avatar.url,
    coverImage: coverImage?.url || ""
  })
 const createdUser = await User.findById(user._id).select("-password -refreshToken")
 if(!createdUser){
  throw new ApiError(500, "something went wrong while registering a user")
 }

 return res.status(201).json(
  new ApiResponse(200, createdUser, "User Register Successfully")
)
} )

export {registerUser}