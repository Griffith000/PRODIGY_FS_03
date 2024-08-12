# Loacal E-commerce platform

TThis project is a local e-commerce platform built with a React frontend and a Node.js backend using Express and MongoDB. The system allows for managing product data, user authentication, and secure payment processing.

## Features

- **User Authentication:**: Secure login and registration using JWT to ensure user data privacy and integrity.
- **Product Management:**: Add, update, and delete product records in the cart.
- **Payment Integration:**: Seamless payment processing using Stripe, ensuring secure and efficient transactions.
- **State Management:**:Leveraging Redux for efficient state management, providing a smooth and responsive user experience.
- **Firebase Integration:**: Utilizing Firebase for storage and authentication, ensuring reliable and scalable backend services.
- **Sorting and Filtering:**: Users can sort and filter products via categories, making it easy to find exactly what they need.
- **Real-Time Updates:**: Users can sort and filter products via categories, making it easy to find exactly what they need.
  
## Tech Stack

**Client:** React, Redux, TailwindCSS , Vite

**Server:** Node, Express ,MongoDb

## Environment Variables

To configure the environment variables for the project, follow these steps:

1. Create a `.env` file in the root directory of the project and in the root of the `client` folder.
2. Add the following environment variables to the `.env` file:

### ./client
`VITE_FIREBASE_API_KEY`
`VITE_FIREBASE_AUTH_DOMAIN`
`VITE_FIREBASE_PROJECT_ID`
`VITE_FIREBASE_STORAGE_BUCKET`
`VITE_FIREBASE_MESSAGING_SENDER_ID`
`VITE_FIREBASE_APP_ID`
`VITE_FIREBASE_MESUREMENT_ID`
`VITE_STRIPE_PUBLIC_KEY`

### ./

`DATABASE_URL`
`JWT_SECRET`
`STRIPE_SECRET_KEY`




