<template>
    <div>
        To be Completed
    </div>
    <DataTable :value="data" tableStyle="min-width: 50rem">
        <Column field="feature" header="Feature"></Column>
        <Column field="status" header="Status"></Column>
        <Column field="description" header="Description"></Column>
        <Column field="comment" header="Comment"></Column>
    </DataTable>
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
            'status': 'In-Progress',
            'description': 'A table and graph of the number of players who have logged into the game within a certain time period',
            'comment': 'Fairly simple. The data itself is ready. Only thing left is creating the UI to display the data as a graph'
        },
        {
            'feature': 'GC Rankings List',
            'status': 'Planned',
            'description': 'List of GC rankings',
            'comment': 'Low priority due to existence of Deachsword. Considering combining with GC matchup predictor functionality for more in-depth data'
        },
    ]
</script>