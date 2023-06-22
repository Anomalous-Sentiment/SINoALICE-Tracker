<template>
    <div>
        <Panel header="Introduction">
            <p>
                This is an experimental project developed with the intent of tracking various statistics about SINoALICE. It is currently a work-in-progress
            </p>
            <p>
                If you are using this right now, then you consent to being a beta tester for me. &#128579
            </p>
            <p>
                Below is a table of the features that are expected to be implemented, and their statuses.
            </p>
            
            <DataTable :value="data" tableStyle="min-width: 50rem">
                <Column field="feature" header="Feature"></Column>
                <Column field="status" header="Status"></Column>
                <Column field="description" header="Description"></Column>
                <Column field="comment" header="Comment"></Column>
            </DataTable>
        </Panel>
        <Panel header="Development">
            <p>
                Development & testing in progress...?
            </p>
            <p>
                Long load times are a known issue. This is an issue with the database service becoming idle after periods of inactivity. Technically isn't an "issue" so much as a feature
                for the DB service provider to save resources (read: money). At any rate, the only solution I have for that is to move to a paid tier with more uptime. But poor is my middle name. Oh well.
            </p>
            <p>
                Please don't let the game EoS on me while I'm working on this...
            </p>
            <p>
                The GC predictor has been completed to the best of my ability. I do not guarantee its complete accuracy, but as long as the LF values for each day are correct,
                I would estimate its accuracy to be around 90%. Accuracy drops when you're near the bottom of the rankings in your TS (Pulled that number out of nowhere. Don't @ me)
            </p>
            <p>
                Thanks to guild members, former guild members, and friends of former guild members for helping with the GC predictor matchmaking & verification. Without their help, it would be in far more terrible state than it is today.
            </p>
            <p>
                Made by a former TS 1 cleric. Inspired by kurelog & Deachsword.
            </p>
        </Panel>
    </div>

  </template>


<script setup>
    const data = [
        {
            'feature': 'Guild List',
            'status': 'Tentatively Complete',
            'description': 'A list of all active guilds in SINoALICE with various stats such as overall rank, total HP, total CP, etc',
            'comment': 'Mostly complete. May change if new improvements need to be made'
        },
        {
            'feature': 'GC Matchup Predictor & Ranking List',
            'status': 'Testing',
            'description': 'A list of the predicted matchups of each guild in GC and rankings.',
            'comment': 'Backend of this functionality is currently undergoing testing. Progress is slow due to only being able to test when GC starts.\nThis function may be scrapped if test results are not desirable\n\nNot all guilds participating in GC are displayed. The guilds excluded from the list are generally those at the bottom of the rankings. This is due to certain... technical limitations.'
        },
        {
            'feature': 'Player Activity & GC Graph',
            'status': 'Tentatively Complete',
            'description': 'A table and graph of the number of players who have logged into the game within a certain time period as well as a graph of final GC LF of each GC',
            'comment': 'A graph of player activity and past GC data'
        }
    ]
</script>