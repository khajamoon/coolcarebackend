
import express from 'express'

import {
    createOrUpdateAdmin,
    readAllAdmin,
    getAdminById,
    deleteAdminById
    } from '../adminControllers/adminController.js'
    const router = express.Router()

// READ ALL Admin
router.get('/admins', async(req, res) => {
    const { success, data } = await readAllAdmin()

    if(success){
        return res.json({success, data})
    }
    return res.status(500).json({success:false, messsage: "Error"})
})

// Get User by ID
router.get('/admin/:email', async(req, res) => {
    const { email } = req.params
    const { success, data } = await getAdminById(email)
    // console.log(data)
    if(success){
        return res.json({success, data})
    }

    return res.status(500).json({success: false, message: "Error"})
})


// Create User
router.post('/admin', async(req, res) => {
    const { success, data } = await createOrUpdateAdmin(req.body)

    if(success){
        return res.json({success, data})
    }

    return res.status(500).json({success: false, message: 'Error'})
})

//userlogin

router.post('/adminlogin', async(req, res) => {
    const { email,password} = req.body
    // console.log(email,password)
    const { success, data } = await getAdminById(email)
    // console.log(success,data)
    if(success){
        if (data.password === password ) 
        {
            return res.json({success, message :"user verified ", isAdmin :true})
        }
        else
        {
            return res.json({success, message :"user not verfied  ", isAdmin:false})
        }
    }
    return res.status(500).json({success: false, message: 'Error'})
})

router.post('/adminlogout', async(req, res) => {
    
    
     return res.json({success :true, message :"user Logout", isAdmin:true})
      
    
    return res.status(500).json({success: false, message: 'Error'})
})

// Update User by ID
router.put('/admin/:email', async(req, res) => {
    const user = req.body
    const { email } = req.params
    user.email = email

    const { success, data } = await createOrUpdateAdmin(user)

    if(success){
        return res.json({success, data})
    }

    return res.status(500).json({success: false, message: "Error"})
})


// Delete User by Id
router.delete('/admin/:email', async (req, res) => {
    const { email } = req.params
    const { success, data } = await deleteAdminById(email)
    if (success) {
      return res.json({ success, data })
    }
    return res.status(500).json({ success: false, message: 'Error'})
})
  


export default router
