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
                Development in progress.
            </p>
            <p>
                Please don't EoS on me while I'm working on this...
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
            'feature': 'GC Matchup Predictor',
            'status': 'In-Progress',
            'description': 'A list of the predicted matchups of each guild in GC.',
            'comment': 'Backend of this functionality is currently undergoing testing. Progress is slow due to only being able to test when GC starts.\nThis function may be scrapped if test results are not desirable'
        },
        {
            'feature': 'Player Activity Table & Graph',
            'status': 'Planned',
            'description': 'A table and graph of the number of players who have logged into the game within a certain time period',
            'comment': 'Method of obtaining data is ready. Still considering how to structure data.'
        },
        {
            'feature': 'GC Rankings List',
            'status': 'Planned?',
            'description': 'List of GC rankings',
            'comment': 'Low priority due to existence of Deachsword. Considering combining with GC matchup predictor functionality for more in-depth data'
        },
    ]
</script>