# SINoALICE Tracker Frontend (Website)
**NOTE: This project is no longer being maintained due to SINoALICE Global ending service on 15 November 2023. There will be very little use for this project unless someone plans on reworking it for SINoALICE JP**

This is the GitHub repository for the SINoALICE Tracker project that was created for the mobile game SINoALICE Global.

This project is composed of multiple separate repositories. This current repository contains the code to run the frontend website which is used to display data.

The second data part of the project which contains the Python scripts for data collection can be found here: [SINoALICE-DB-Updater repository](https://github.com/Anomalous-Sentiment/SINoALICE-DB-Updater)

Note that the website will not display any data without a working database connection. You must provide the database yourself. The SQL commands to create and initialise a working database
can also be found in the second part of the project here: [SINoALICE-DB-Updater Database SQL](https://github.com/Anomalous-Sentiment/SINoALICE-DB-Updater/tree/main/database)

## Oauth Authentication
Discord authentication was initially implemented, but I eventually turned it offI didn't see much point to the login, especially since I don't actually need to authenticate users in the first place. The one possiblity I did consider was an access list to blacklist people who might abuse the site, but that was more trouble than it was worth, and contradictory to how I wanted to display all the data to everyone anyway. 

In the end, authentication was turned off, but can be turned on again through the environment variable.

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

## Screenshots
Examples of what the website looks like:

![Home Page](/screenshots/sinotracker-home.PNG)
![Guild List Page](/screenshots/sinotracker-guilds.PNG)
![About Page](/screenshots/sinotracker-guild-profile.PNG)
![Statistics Page](/screenshots/sinotracker-statistics.PNG)
![GC Predictor Page](/screenshots/sinotracker-gc-predictor.PNG)
![Methodology Page](/screenshots/sinotracker-methodology.PNG)
![About Page](/screenshots/sinotracker-about.PNG)


## Final Comments
I'm quite happy with the end product, although it's a shame that it didn't get much use before end of service was announced. It's really quite nice to make something that make something that you'd use for yourself.

At any rate, it was certainly an educational journey, and as for me, I'll be on my way looking for a goddamned job. Actually, to be honest, this was also a way for me to build a "portfolio" of sorts as I searched for a job, but it turns out it's a lot harder than I thought to get a job without professional experience or a silver tongue. Well, I digress.

I'm not sure if JP has something like this here (only one I know is Deachsword), but if anyone wants to try to adapt this for JP, feel free. Although I hear JP has their fair share of troubles too these days.

Anyway, I'll be signing off here. See you guys again... One day.