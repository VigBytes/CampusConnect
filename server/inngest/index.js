
import { Inngest } from 'inngest'
import User from '../models/User.js'

export const inngest = new Inngest({
      id: 'campusconnect',
})

const syncUserCreation = inngest.createFunction(
      {id:'sync-user-from-clerk'},
      {event:'clerk/user.created'},
      async({event})=> {
            console.log('User created event received:', event)
            // Add your logic to sync the user with your database here
            const {id, email_addresses, first_name, last_name, image_url} = event.data
            let username = email_addresses[0]?.email_address.split('@')[0];
            const user = await User.findOne({username})
            if(user){
                  console.log('User already exists in the database:', user)
                  username = username + Math.floor(Math.random() * 1000)
            }

            const userData = {
                  _id: id,
                  email: email_addresses[0]?.email_address,
                  full_name: first_name + ' ' + last_name,
                  profile_picture: image_url,
                  username: username,
            }
            await User.create(userData)
      }
)

//Inngest function to update user profile when user is updated in clerk
const syncUserUpdate = inngest.createFunction(
      {id:'sync-user-update-from-clerk'},
      {event:'clerk/user.updated'},
      async({event})=> {
            console.log('User updated event received:', event)
            // Add your logic to update the user in your database here
            const {id, email_addresses, first_name, last_name, image_url} = event.data
            const updatedUserData = {
                  email: email_addresses[0]?.email_address,
                  full_name: first_name + ' ' + last_name,
                  profile_picture: image_url,
            }
            await User.findByIdAndUpdate(id, updatedUserData)     
            }

      
)

//Inngest function to delete user profile when user is deleted in clerk
const syncUserDeletion = inngest.createFunction(
      {id:'sync-user-deletion-with-clerk'},
      {event:'clerk/user.deleted'},
      async({event})=> {
            console.log('User deleted event received:', event)
            // Add your logic to delete the user from your database here
            const {id} = event.data
            await User.findByIdAndDelete(id)
      }
)



export const functions=[syncUserCreation, syncUserUpdate, syncUserDeletion];
