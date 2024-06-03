import {db, admin} from '../config/db.config.js'

// Create or Update users
const createOrUpdateAdmin = async (data = {}) =>{
    const params = {
        TableName: admin,
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
const readAllAdmin = async()=>{
    const params = {
        TableName: admin
    }

    try{
        const { Items = [] } = await db.scan(params).promise()
        return { success: true, data: Items }

    } catch(error){
        return { success: false, data: null }
    }

}

// Read Users by ID
const getAdminById = async (value, key = 'email') => {
    // console.log(value)
    const params = {
        TableName: admin,
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
const deleteAdminById = async(value, key = 'email' ) => { 
    const params = {
        TableName: admin,
        Key: {
            [key]:value
        }
    }
        
    try {
        await db.delete(params).promise()
        return {  success: true }

    } catch (error) {
        return{ success: false }
    }
}


export {
    createOrUpdateAdmin,
    readAllAdmin,
    getAdminById,
    deleteAdminById
}