This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## Getting Started

# Next/tRPC Setup
Step 1 : install the necessary dependecies/libraries. In our case we installed trps/server package. this is gonna play a dual role. Its gonna serve the pages of off "/" 
and also serve our api endpoint. we are also gonna be make queries so we will be needing trpc/client. We will also be using react query on top of trpc. hence we will be needing trpc/react-query and tanstack/react-query.
Step 2 : The first thing we need to do now is initialize our server. All of our server code is gonna go under the server directory.
step 3 : we created a router that is going to have our procedures on it i.e. server/index.ts.
step 4 : app/api/trpc/[trpc]/route.ts : Now we need to connect our server into our next app router itself. To do that we need to create a route inside of our app router in a folder named api. This is going to route our requests to our trpc instance , in our case server/trpc.ts; You will probably never need to change this file. Adding new routes is just as simple as 
adding new endpoints/procedures inside our server/index.ts;

# tRPC client setup
step 5 : Now go to "http://localhost:3000/api/trpc/getTodos:. Tadaa...we have our data.Next thing we are gonna do is make that request from the client side.
step 6 : Create a _trpc directery under app. Any directory starting with _ wont be recognised by the app router as a route. Inside this we have our trpc react client that 
will be a cinjuction between our api and frontend. We use createTRPCReact adapter library for this.
Step 7 : Now react query needs a provider, so we need to go and create a Provider i.e. _trpc/Provider.tsx. We have a trpc client and a queryclient and then we are gonna pass those down to any children inside our Provider component. Wrap the children inside layout.tsx with our Provider.
step 8 : we now need to make a component to make an actual request.Make a client component inside _components/TodoList.tsx. Now if we goto localhost:3000, we can see our data. Amazing!

# Drizzle Orm Setup
Step 9 : To make this example more practical, we need to connect our app to a database. We will be using drizzle for now. Add drizzle-orm and better-sqlite3 libraries. Sqlite3 does not have types so we will also need to bring in the @types/better-sqlite3.
Step 10 : Now we have to define our schema ( where is our db gonna hold ). So we create a db/schema.ts inside the root directory.
Step 11 : We will also need a drizzle configuration ( db location, credentials). For this project, ill be using drizzle-kit. Next is, yes correct...building migration. If you are confused what the heck in the world is migration...scroll down below it should be ryt below this section.

# Connect Drizzle to trpc
step 12 : Create an instance of Database inside server/index.ts and point it at our database, and create out database drizzle object. We will be using this object to make queries.

# Now if we goto our dev server, we get and empty page. This is fine coz we dont have any data inside our db. Create a addTodo procedure and validate input using Yup, or Zod or if u want write ur own custom validation.
Next is upto you what you want to do with the todo list. For now i have added a addTodo procedure just to keep it simple.


## tRPC also supports SSR. But i have not got my hands on that...i mean its still here but i dont completely understand it. I will update the readme once i have understood why we are doing anything in it.

## Why Migration?
Goto db/schema.ts. This file defines the schema i.e. what or db is gonna hold. But this is not how actually sql queries look like ..ryt? Hence we need to convert this to an actual sql query , so we migrate our schema that generates a query that will be actually used by sql to create out table. ( Check drizzle/0000_abandoned... file.)