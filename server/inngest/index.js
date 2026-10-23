
import { Inngest } from 'inngest'
import User from '../models/User.js'
import Story from '../models/Story.js'

export const inngest = new Inngest({
    id: 'campusconnect',
})

// Create user when a user is created in Clerk
const syncUserCreation = inngest.createFunction(
    {
        id: 'sync-user-from-clerk',
        triggers: { event: 'clerk/user.created' },
    },
    async ({ event }) => {
        console.log('User created event received:', event)

        const { id, email_addresses, first_name, last_name, image_url } = event.data

        const email = email_addresses?.[0]?.email_address

        if (!id || !email) {
            throw new Error('Clerk user ID or email is missing')
        }

        const existingUser = await User.findById(id)

        // Prevent duplicate user creation if the event is retried
        if (existingUser) {
            console.log('User already exists:', id)
            return
        }

        const baseUsername = email.split('@')[0]
        let username = baseUsername

        const usernameExists = await User.findOne({ username })

        if (usernameExists) {
            username = `${baseUsername}_${id.slice(-6)}`
        }

        const userData = {
            _id: id,
            email,
            full_name: [first_name, last_name].filter(Boolean).join(' ') || baseUsername,
            profile_picture: image_url || '',
            username,
        }

        await User.create(userData)

        console.log('User synced successfully:', id)
    }
)

// Update user when their Clerk profile changes
const syncUserUpdate = inngest.createFunction(
    {
        id: 'sync-user-update-from-clerk',
        triggers: { event: 'clerk/user.updated' },
    },
    async ({ event }) => {
        console.log('User updated event received:', event)

        const { id, email_addresses, first_name, last_name, image_url } = event.data

        const updatedUserData = {
            email: email_addresses?.[0]?.email_address,
            full_name: [first_name, last_name].filter(Boolean).join(' '),
            profile_picture: image_url || '',
        }

        await User.findByIdAndUpdate(id, updatedUserData, {
            new: true,
            runValidators: true,
        })
    }
)

// Delete user when their Clerk account is deleted
const syncUserDeletion = inngest.createFunction(
    {
        id: 'sync-user-deletion-with-clerk',
        triggers: { event: 'clerk/user.deleted' },
    },
    async ({ event }) => {
        console.log('User deleted event received:', event)

        const { id } = event.data

        await User.findByIdAndDelete(id)

        console.log('User deleted successfully:', id)
    }
)
//Ingest Function to Delete Story after 24 hours of creation


const deleteStory = inngest.createFunction(
    {
        id: 'story-delete',
        triggers: { event: 'app/story.delete' },
    },
    async ({ event, step }) => {
        const { storyId } = event.data;

        const in24Hours = new Date(
            Date.now() + 24 * 60 * 60 * 1000
        );

        await step.sleepUntil('wait-for-24-hours', in24Hours);

        await step.run('delete-story', async () => {
            await Story.findByIdAndDelete(storyId);

            return { message: 'Story deleted.' };
        });
    }
)


export const functions = [
    syncUserCreation,
    syncUserUpdate,
    syncUserDeletion,
    deleteStory,
]

