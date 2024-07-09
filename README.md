# Snoopy Reddit 

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Running locally in development mode

To get started, just clone the repository and run `npm install && npm run dev`:

    git clone https://github.com/ericajanetem/snoopy-reddit.git
    npm install
    npm run dev

Note: If you are running on Windows run install --noptional flag (i.e. `npm install --no-optional`) which will skip installing fsevents.

## Configuring

If you configure a .env file (just copy [.env.example](https://github.com/iaincollins/nextjs-starter/blob/master/.env.example) over to '.env' and fill in the options) you can configure a range of options.

#### Kinde


#### Supabase PostgresSQL
Follow the guide here: https://supabase.com/partners/integrations/prisma:

Set the following fields:

`DATABASE_URL="" # Set this to the Transaction connection pooler string you copied in Step 1`

`DIRECT_URL=""  # Set this to the Session connection pooler string you copied in Step 1`

#### Kinde 
Kinde is used for authorization, user management and authentication.

Follow the guide here: https://docs.kinde.com/developer-tools/sdks/backend/nextjs-sdk/

Set the following fields:

```
KINDE_CLIENT_ID=<your_kinde_client_id>
KINDE_CLIENT_SECRET=<your_kinde_client_secret>
KINDE_ISSUER_URL=https://<your_kinde_subdomain>.kinde.com
KINDE_SITE_URL=http://localhost:3000
KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/dashboard
```

### Prisma

Prisma is a ORM used to connect to the database.

Installation:
```
npm install prisma --save-dev
npx prisma
```

## Running

Running locally, you should be able to see the application in [https://localhost.3000](http://localhost:3000/)
