
#  LiveVista

A live streaming platform for seamless streaming, facilating various functionality to streamer and the viewers.
## Tech Stack


- Next.js using server actions - for both frontend and backend
- TypeScript - for type safty
- aiven.io - database provider ( MySQL)
- Prisma - ORM
- uploadThings - File upload
- Clerk - Auth provider
- Shadcn - UI components and theme
- zustand - state management




## Example

![Screenshot (619)](https://github.com/tanmayR18/LiveVista/assets/135257857/0ca76498-f4a4-401e-a402-702ad683ed01)

![Screenshot (620)](https://github.com/tanmayR18/LiveVista/assets/135257857/8fc89465-e6a1-436f-94ff-0489c23afebb)

![Screenshot (621)](https://github.com/tanmayR18/LiveVista/assets/135257857/d86b212a-3355-4ad0-8b1c-8fb16778da45)





## Features

- Authentication of user
- Search streamers
- Follow streamers
- Update username
- Real time chat
- Block and Unblock viewer
- View stream without login



## Run Locally

- Clone the project in your local device 
- Open the project in your favourite code editor
- Open terminal and add the following commands  
        1. `npm i` or `npm install`  
        2. `npm run dev`  
        
- Get and add the environment variable given below
- The project will be automatically open in your default browser on the localhost:3000
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - from your clerk account

`CLERK_SECRET_KEY` - from your clerk account

`CLERK_WEBHOOK_SECRECT` - from your clerk account

`LIVEKIT_API_URL` - from your livekit account

`LIVEKIT_API_KEY` - from your livekit account

`LIVEKIT_API_SECRET` - from your livekit account

`DATABASE_URL` - Local MySQL or any other provider URL

`UPLOADTHING_SECRET` - from your uploadThings account

`UPLOADTHING_APP_ID` - from your uploadThings account

`NEXT_PUBLIC_CLERK_SIGN_IN_URL` - /sign-in

`NEXT_PUBLIC_CLERK_SIGN_UP_URL` - /sign-up

`NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` - /

`NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` - /

## Deployment

Vercel - https://live-vista.vercel.app/
