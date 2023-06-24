<template>
    <div>
        <Panel header="Introduction">
            <p>
                This is an experimental project developed with the intent of tracking various statistics about SINoALICE. 
            </p>
            <p>
                Project is complete as of 24/06/23.
            </p>
            <p>
                Thanks to everyone who helped in the development of this project.
            </p>
            <p>
                All major features and functionality have been successfully implemented. Going forward, only minor changes and bug fixes will be made. There will be no more major
                features or functions to be implemented.
            </p>
            <p>
                Below is a table of the features that are completed.
            </p>
            
            <DataTable :value="data" tableStyle="min-width: 50rem">
                <Column field="feature" header="Feature"></Column>
                <Column field="description" header="Description"></Column>
                <Column field="comment" header="Comment"></Column>
            </DataTable>
        </Panel>
        <Panel header="Comments">
            <p>
                This website uses Google ReCAPTCHA v3. If data is not loading, please try another browser in case ReCAPTCHA has flagged you or your browser as a bot.
            </p>
            <p>
                Long load times are a known issue. One possible cause is the database service becoming idle after periods of inactivity. Technically isn't an "issue" so much as a feature
                for the DB service provider to save resources (read: money). At any rate, the only solution I have for that is to move to a paid tier with more uptime. But poor is my middle name. Oh well.
            </p>
            <p>
                The GC predictor has been completed to the best of my ability. I do not guarantee its complete accuracy, but as long as the LF values for each day are correct,
                I would estimate its accuracy to be around 90%. Accuracy drops when you're near the bottom of the rankings in your TS (Pulled that number out of nowhere. Don't @ me. By bottom of the rankings, I mean like 0 LF. That's unknown territory)
            </p>
            <p>
                Thanks to guild members, former guild members, and friends of former guild members for helping with the GC predictor matchmaking & verification. Without their help, it would be in far more terrible state than it is today.
            </p>
            <p>
                Made by a former TS 1 cleric. Inspired by Kurelog & Deachsword.
            </p>
            <p>
                Please don't let the game EoS...
            </p>
        </Panel>
    </div>

  </template>


<script setup>
    const data = [
        {
            'feature': 'Guild List',
            'description': 'A list of all active guilds in SINoALICE with various stats such as overall rank, total HP, total CP, etc',
            'comment': 'CP values are estimates only. For more accurate CP values, please refer to a community google doc maintained by Catch. I am not involved in any way, but I believe it is a useful document for accurate CP values.'
        },
        {
            'feature': 'GC Matchup Predictor & Ranking List',
            'description': 'A list of the predicted matchups of each guild in GC and their rankings.',
            'comment': ' Ranks displayed here are calculated based on LF. They may differ from the ranking seen in-game. Not all guilds participating in GC are displayed. The guilds excluded from the list are generally those at the bottom of the rankings. This is due to certain... technical limitations.'
        },
        {
            'feature': 'Player Activity & GC Graph',
            'description': 'A table and graph of the number of players who have logged into the game within a certain time period as well as a graph of final GC LF of each GC',
            'comment': 'A graph of player activity and past GC data. Player login data updated daily automatically. GC graph data should update after each GC concludes.'
        }
    ]
</script>