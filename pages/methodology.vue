<template>
    <Panel id="data-collection" header="Data Collection">
        <p>
            Guild and player data is collected and updated once per day in the hours following server reset time. You may notice the number of guilds on the guild page increasing over time.
            This is due to how I find guilds in-game. Guilds are added to the database as they appear in the lifeforce rankings page in-game. This means that if a guild gets a non-zero amount of lifeforce
            in colosseum, then they will appear in the rankings, and will therefore be detected and added to the database.
        </p>
        <p>
            Conversely, as long as a guild does not ever gain any lifeforce in colosseum, they will never appear in the guild list.
        </p>
        <p>
            This data collection is fully automated unless unexpected issues arise.
        </p>

    </Panel>
    <Panel id="player-cp-values" header="Player CP Values">
        <p>
            Player CP values on this site come in two values: current and estimated.
        </p>
        <p>
            But before we get into that, we need to understand the data available to us from the API. Basically, there are 2 sources of data where we can obtain a player's CP:
            <ul>
                <li>
                    Main Set CP
                    <ul>
                        <li>
                            Self explanatory. The CP main equipped set of the player. The P.Atk, P.Def, M.Atk, and M.Def are also available with this data (Main profile page). 
                        </li>
                    </ul>
                </li>
                <li>
                    Last Used Set CP
                    <ul>
                        <li>
                            The CP of the player's last used set. This is the value commonly seen when you complete a verse in co-op at the end. (The screen where you can choose to follow other players)
                        </li>
                    </ul>
                </li>
            </ul>
        </p>
        <p>
            So, knowing this information we can then get our "Current" and "Estimated" CP values:
        </p>
        <ul>
            <li>
                Current CP
                <ul>
                    <li>
                        This is the CP of the player's main, currently equipped gear set at the time of data collection
                    </li>
                </ul>
            </li>
            <li>
                Estimated CP
                <ul>
                    <li>
                        This is the highest ever CP detected between the main set and the last used set.
                    </li>
                    <li>
                        This CP value will only change if the "last used set" or "main set" have a higher value than the current "Estimated CP" value
                    </li>
                    <li>
                        The reason this is called the "Estimated CP" is due to the assumption the highest CP of the player is the most representative of their real CP
                    </li>
                </ul>
            </li>
        </ul>
        <p>
            Estimated CP is provided as a way to get more accurate CP value for players who are permanently on a combo set, however, it is not a foolproof approach.
            There are still ways around it, but this is the best estimate I can give with the data available to me.
        </p>

    </Panel>
    <Panel id="guild-cp-values" header="Guild CP Values">
        <p>
            All guild CP values shown on the guild list page of this site are calculated based on the estimated CP values of each player in the guild at the time the data is collected <NuxtLink to="#player-cp-values">(see above)</NuxtLink>.
        </p>
        <p>
            All values should be taken with a grain of salt as they are calculated based on estimated values themselves.
        </p>
    </Panel>
    <Panel id="gc-predictions" header="GC Predictions">
        <p>
            All GC match predictions are based off a matchmaking algorithm which was described to me by a very nice person (Not sure if it's okay to name them, so I'll stay on the safe side, haha).
        </p>
        <p>
            Predictions are generated at the same time the GC ranking data is collected and updated. The specific time the GC data is updated may vary as the time that the in-game rankings themselves
            update to vary as well. But as a general rule, the earliest the data (on this site) can update will be 14-15 minutes after a match ends, but it is possible to take longer.
        </p>
    </Panel>
</template>

<script setup>

</script>