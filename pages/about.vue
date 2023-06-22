<template>
    <Panel header="Introduction">
        <p>
            It seems I'm going to end up following the same structure from my last project *Looks at it collecting dust in the corner*, but oh well.
        </p>
        <p>
            It's written on the home page already, but this is a project that's partially inspired by kurelog and deachsword. Just a year or two ago, I would have never imagined I'd be
            doing something like this, but here I am, haha. Essentially, I had 2 main motivations for even beginning this project:
        </p>
        <ol>
            <li>Seeing the full list of guilds in the game according to their "overall rank", which is viewable on the guild page</li>
            <li>Trying to predict GC matchups to the best of my ability</li>
        </ol>
        <p>
            After all, our community is quite isolated and segregated. Don't we want to know about the other guilds around us? The guilds in different timeslots?
            Which guild fought which? The best guilds of each timeslot?
        </p>
        <p>
            And funnily enough, although there's a "Rankings" page in-game, it only shows the LF obtained by guilds in colo, not their "Overall ranking" which is shown on their
            main guild page. It was strange to me. Why have a ranking on the page, but not display it as a list? So I figured I'd try to do it myself, haha.
        </p>
    </Panel>
    <Panel header="Development Process">
        <p>
            I'm not gonna lie, I'd actually taken a crack at the API a bit over a year ago, but I gave up since I honestly had no idea what the heck I was doing.
            The very idea of decompiling APKs and looking through binaries to find stuff was beyond me.
        </p>
        <p>
            So I just gave up. Then 6 months earlier (Start of 2023), I came back and took another look. Even now, I don't fully understand this stuff, but there are certain useful... work that
            people have previously done with the API, which I won't describe here, but it simplified things for me such that I only needed to obtain the values of certain variables
            before being able to successfully communicate with the server API. That being said, looking for those variables was another miserable task within itself for
            someone inexperienced like me, haha. I recall it took roughly a few weeks to a couple months to get them. 
            
            I believe an experienced person could probably do it within a day or two.
        </p>
        <p>
            Once that was done, next was identifying the available API endpoints which were usable. This was done by essentially intercepting requests from the app to the server
            and well, if you're familiar with HTTP requests, then that should be fairly easy. I personally had some basic understanding, and that was enough.
        </p>
        <p>
            At this point, what I was doing was essentially emulating the requests that the app made to the server programmatically. For the not so technically inclined, it was just
            using code to communicate with the server instead of the app UI.
        </p>
        <p>
            What this meant is that any data available to be viewed in-game, I could now request that same data from the server using code. The advantage being that a lot of data
            in-game could now be automatically collected, stored, and analysed.
        </p>
        <p>
            However, before starting on that, I completed a set of functions to simplify communication with the API, that took another few weeks. The final product being
            a set of classes with functions that you simply call to retrieve data from the server. Of course, you had to provide your own "secret" variables to use those functions,
            otherwise the server would simply reject the request.
        </p>
        <p>
            Then came the actual data collection. I spent another few weeks to months on this as well, scheduling times to collect data from the server, there were
            a number of restrictions to work under, as the process had to be up 24/7, which meant it wasn't feasible to host it from my own pc. On top of that,
            there were a number of other issues such as server maintenence, timeouts, and internal issues with the database service, but it turned out ok in the end.
            The result was fully automated data collection, which included a GC prediction algorithm which runs at the same time GC data is updated.
        </p>
        <p>
            On that note, the GC prediction algorithm was not my own idea. The was code written by me, based on various diagrams and descriptions from a very... generous person. 
            Without their help, the GC predictor would be in a absolutely horrendous state. So big thanks for that. 
        </p>
        <p>
            During this stage, the database schema was also created. This is also the stage where player login activity is recorded using various triggers to aggregate
            data into categories based on their last login time.
        </p>
        <p>
            At the time of writing, most issues should be worked out, but some still remain, relating to the exact time to run the GC data update. Running it too early will affect
            the predictions as it will predict on the old GC rankings, which will cause it to be incorrect. You will know this happened when you see every guild in a timeslot
            have 0 LF gain/change after the update. A modification has been made to rectify this, but still needs to be tested to see whether it resolves the issue.
        </p>
        <p>
            Next, is the development of the frontend to display this data. This is what you currently see, and is what you are reading this on. It is the website you see here.
            This was actually a new tech stack for me to work with. My previous project used NextJS for the frontend, while this one used NuxtJS. The documentation
            available was significantly less than NextJS, which hindered my development at times.
        </p>
        <p>
            In general, I chose to display most of the data in a table format. The only exceptions being the aggregated statistics, which seemed best suited as graphs. And who doesn't
            like a pretty graph anyway? We need some color in this dark dreary website, haha.
        </p>
        <p>
            During my journey, I realised how kurelog was able to obtain all that player data back then (gold, exp, deck cost, etc). And, the answer was surprising. Put simply,
            maybe Pokelabo should follow the CIA triad principles for information security xD Although, if they do decide to make changes, it might break what I have here, sooo, hmm... I dunno.
        </p>
        <p>
            Oh, there's also the choice of managed database and platforms to deploy the backend and frontend on, but that's boring stuff I don't think anyone wants to
            read about. All I'll say is that good free tier services are hard to find. If the costs exceed what I can manage, this whole thing is gonna disappear into oblivion.
            But who knows, maybe the game will boom before that, haha.
        </p>
        <p>
            And with this, I'm out. Thanks to anyone who bothered to read all this. I usually like to leave behind a little review of my projects and how I tracked through them. This one in particular
            has been particularly educational, and I was definitely more motivated on this project compared to my last one. After all, the prospect of being able to see the matchups of every guild in GC is rather enticing
            after all. My last project... Well, I can almost see the cobwebs on it... <i>Looking at that nightmare planner in the corner</i>
        </p>
    </Panel>

</template>

<script setup>

</script>