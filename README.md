# SINoALICE Tracker Frontend (Website)
**NOTE: This project is no longer being maintained due to SINoALICE Global ending service on 15 November 2023. There will be very little use for this project unless someone plans on reworking it for SINoALICE JP**

This is the GitHub repository for the SINoALICE Tracker project that was created for the mobile game SINoALICE Global.

This project is composed of multiple separate repositories. This current repository contains the code to run the frontend website which is used to display data.

The second data part of the project which contains the Python scripts for data collection can be found here: [SINoALICE-DB-Updater repository](https://github.com/Anomalous-Sentiment/SINoALICE-DB-Updater)

Note that the website will not display any data without a working database connection. You must provide the database yourself. The SQL commands to create and initialise a working database
can also be found in the second part of the project here: [SINoALICE-DB-Updater Database SQL](https://github.com/Anomalous-Sentiment/SINoALICE-DB-Updater/tree/main/database)

## Setup

Install the dependencies:

```bash
# npm
npm install
```

Using the `example.env` file as reference, set the required environment variables. If runnning locally, you may create a `.env` file in the same directory, and place your variables there.

## Development Server

Make sure dependencies are installed and environment variables are set, and start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Make sure environment variables are set, and start the production build:

```bash
npm run serverstart
```

You might also notice a normal ```start``` script in the ```package.json``` file. You can ignore that. That is a leftover script from when Sinotracker was deployed on [cyclic.sh](https://www.cyclic.sh/)

If you get a AUTH_NO_ORIGIN error, then you need to set an origin URL, either in the ```.env``` file or in the ```nuxt.config.ts``` file. See the [Sidebase docs](https://sidebase.io/nuxt-auth/configuration/nuxt-config) for more details. Ideally it'd be set as an environment variable.