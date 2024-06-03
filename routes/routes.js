import express from 'express'
import { createOrUpdate, deleteUserById, getUserById, readAllUsers, sendResponse,generateOTP,generateTrackerId, getUserByEmail, getUserBymobileno } from '../userControllers/userController.js'


const router = express.Router()

// READ ALL Users
router.get('/users', async (req, res) => {
    const { success, data } = await readAllUsers()

    if (success) {
        return res.json({ success, data })
    }
    return res.status(500).json({ success: false, messsage: "Error" })
})

// Get User by ID
router.get('/user/:mobileno', async (req, res) => {
    const { mobileno } = req.params
    const { success, data } = await getUserById(mobileno)
    // console.log(data)
    if (success) {
        return res.json({ success, data })
    }

    return res.status(500).json({ success: false, message: "Error" })
})
router.post('/user/mobileno', async (req, res) => {
    const { mobileno } = req.body
    const { success, data } = await getUserBymobileno(mobileno)
    // console.log(data)
    if (success) {
        return res.json({ success, data })
    }

    return res.status(500).json({ success: false, message: "Error" })
})


// Create User
router.post('/user', async (req, res) => {
    const { success, data } = await createOrUpdate(req.body)
    if (success) {
        return res.json({ success, data })
    }
    return res.status(500).json({ success: false, message: 'Error' })
})
router.post('/generateotp', async (req, res) => {
    const { email,mobileno } = req.body;
    const userobj= await getUserById(mobileno)
    // console.log(userobj,"hii")
    if (Object.keys(userobj?.data).length != 0 && userobj.data.isotpVerfied ) {
        // console.log("user present")
        return res.json({ success:true ,isUser: true  ,message:"User Existed"})
    }
    else {
        // console.log("user not present");
        const { success, otp } = await generateOTP(req.body)
        if (success) {
            let tempObj =req.body
            tempObj.otp = otp,
            tempObj.isotpVerfied =false
            const { success, data } = await createOrUpdate(tempObj)
            return res.json({ success,isUser: false  ,message:"OTP sent"})
        }
        // console.log("hi"); 
    }
    return res.status(500).json({ success: false, message: 'Error' })
})

//send response to trackerID

router.post('/searchtrackrid', async (req, res) => {
    const { email,mobileno,trackerId } = req.body;
    const userobj= await getUserById(mobileno)
    // console.log(userobj,"hii")
    if (Object.keys(userobj?.data).length != 0  && userobj?.data.trackerId ===trackerId) {
        // console.log("user present")
            const { success, message } = await sendResponse(userobj.data)
            if (success) {

                return res.json({ success, isUser: false, message: "Response sent" })
            }
        
        // console.log("hi"); 
    }
    else {
        // console.log("tracker ID  not present");
        return res.json({ success:true ,isUser: true  ,message:"trackerId Not Existed"})

    }
    return res.status(500).json({ success: false, message: 'Error' })
})
router.post('/verifyotp', async (req, res) => {
    const {otp,email,mobileno} = req.body;
    const userobj= await getUserById(mobileno)
    // console.log(userobj,"sdfdsfs")
    if( userobj.data.otp ==otp )
    {
        // console.log("hello")
        let tempObj =req.body
        tempObj.trackerId = mobileno
        tempObj.otp = otp,
        tempObj.response=''
        tempObj.isotpVerfied =true
        await generateTrackerId(tempObj)
        // console.log(tempObj)
        const { success, data } = await createOrUpdate(tempObj)
        // console.log(success)
        if(success)
        {
             return res.json({ success:true, message:"OTP Verified"})
        }
    }
    else
    {
        return res.json({ success:true, message:"OTP Not Verified"})
    }
    return res.status(500).json({ success: false, message: 'Error' })

})

// Update User by ID
router.put('/user/:mobileno', async (req, res) => {
    const user = req.body
    const { mobileno } = req.params
    user.mobileno = mobileno

    const { success, data } = await createOrUpdate(user)

    if (success) {
        return res.json({ success, data })
    }

    return res.status(500).json({ success: false, message: "Error" })
})


// Delete User by Id
router.delete('/user/:mobileno', async (req, res) => {
    const { mobileno } = req.params
    const { success, data } = await deleteUserById(mobileno)
    if (success) {
        return res.json({ success, data })
    }
    return res.status(500).json({ success: false, message: 'Error' })
})


export default router