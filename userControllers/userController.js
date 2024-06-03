import {db, UserTable} from '../config/db.config.js'
import  nodemailer from "nodemailer";


// Create or Update users
const createOrUpdate = async (data = {}) =>{
    const params = {
        TableName: UserTable,
        Item: data
    }

    try{
        await db.put(params).promise()
        return { success: true }
    } catch(error){
        return { success: false}
    }
}

// Read all users
const readAllUsers = async()=>{
    const params = {
        TableName: UserTable
    }

    try{
        const { Items = [] } = await db.scan(params).promise()
        return { success: true, data: Items }

    } catch(error){
        return { success: false, data: null }
    }

}

// Read Users by ID
const getUserById = async (value, key = 'mobileno') => {
    const params = {
        TableName: UserTable,
        Key: {
            [key]: value,
            // ["mobilno"]:"7997294780"
        }
    }
    try {
        const { Item = {} } =  await db.get(params).promise()
        return { success: true, data: Item }
    } catch (error) {
        return {  success: false, data: null}        
    }
}
const getUserBymobileno = async (value, key = 'mobileno') => {
    const params = {
        TableName: UserTable,
        Key: {
            [key]: value
        }
    }
    try {
        const { Item = {} } =  await db.get(params).promise()
        return { success: true, data: Item }
    } catch (error) {
        return {  success: false, data: null}        
    }
}

const getUserByEmail = async (value, key = 'mobileno') => {
    const params = {
        TableName: users,
        Key: {
            [key]: value
        }
    }
    try {
        const { Item = {} } =  await db.get(params).promise()
        return { success: true, data: Item }
    } catch (error) {
        return {  success: false, data: null}        
    }
}

// Delete User by ID
const deleteUserById = async(value, key = 'mobileno' ) => { 
    const params = {
        TableName: UserTable,
        Key: {
            [key]: value
        }
    }
        
    try {
        await db.delete(params).promise()
        return {  success: true }

    } catch (error) {
        return{ success: false }
    }
}
const generateOTP = async (value, res) => {
    const { email } = value;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    var transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        secure: true,
        port: 465,
        auth: {
          user: "khajashai21206@gmail.com",
          pass: "lgqr atuz glvo itia",
        },
      });
      var mailOptions = {
        from: "khajashai21206@gmail.com",   
        to: email,
        subject: "OTP to Login into your Account",
        text: `hi user your OTP is ${otp} do not share it `,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          throw err;
        } else {
            return { success: true }
        }
      });
      return { success: true, otp : otp }
 
  
};
const generateTrackerId = async (value, res) => {
    const { email ,trackerId} = value;
    var transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        secure: true,
        port: 465,
        auth: {
          user: "khajashai21206@gmail.com",
          pass: "lgqr atuz glvo itia",
        },
      });
      var mailOptions = {
        from: "khajashai21206@gmail.com",   
        to: email,
        subject: "TrackerID ",
        text: ` hi this is your tracker Id to  ${trackerId} use it further to search for you responce` ,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          throw err;
        } else {
            return { success: true }
        }
      });
      return { success: true, message :  "tracker Id sent"}
 
  
};
const sendResponse = async (value, res) => {
    const { email ,trackerId ,response} = value;
    var transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        secure: true,
        port: 465,
        auth: {
          user: "khajashai21206@gmail.com",
          pass: "lgqr atuz glvo itia",
        },
      });
      var mailOptions = {
        from: "khajashai21206@gmail.com",   
        to: email,
        subject: "TrackerID ",
        text: `Hi this is your response from our team  "${response} "` ,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          throw err;
        } else {
            return { success: true }
        }
      });
      return { success: true, message :  "tracker Id sent"}
 
  
};




export {
    createOrUpdate,
    readAllUsers,
    getUserById,
    deleteUserById,
    generateOTP,
    getUserByEmail,
    getUserBymobileno,
    generateTrackerId,
    sendResponse
}