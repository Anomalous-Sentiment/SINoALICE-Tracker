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
        <p>
            For more accurate guild CP values, see <NuxtLink to="https://docs.google.com/spreadsheets/d/1Ci0f9X1aZgNbTPt5-roKAixBO2jVXbrhqAcF_Vwfhxg/edit">this spreadsheet</NuxtLink> maintained by Catch (Discord: re.catch) with help from the community. Please feel free to contribute to the spreadsheet to improve it's accuracy and reliability.
            To contribute to the spreadsheet, please message <em>re.catch</em> on Discord.
        </p>
    </Panel>
    <Panel id="guild-page" header="Guild Page">
        <p>
            The guild page displays the basic data of a guild, past GC rankings as well as the estimated CP of current members.
        </p>
        <p>
            The past GC table contains the names the guild has used in past GCs. The table shows the name the guild used at the time of the final GC ranking update. Other names that were used in that GC are shown in a tooltip which will display upon mouseover. This is not an exhaustive list, and it is possible the guild has used other names which are not listed here.
            The names listed here are the names that the guild was using at the time of the last GC update of each day (Currently after TS 10).
        </p>
        <p>
            A maximum of 5 names may be listed in the tooltip + the name in the table.
        </p>
    </Panel>
    <Panel id="gc-predictions" header="GC Predictions">
        <p>
            All GC match predictions are based off a matchmaking algorithm which was described to me by a very nice person (Not sure if it's okay to name them, so I'll stay on the safe side, haha). I'm also told that there's a TS 3-6? discord where people do accurate predictions, so I suppose
            the peeps over there know the matching algorthm too, but I haven't seen it personally. <del>But I also hear that I live under a rock a lot too</del>
        </p>
        <p>
            The little arrows on the left of each row in the table can be clicked to expand the selected row and show the LF of the guild on each day of GC. The LF of the predicted opponent is also shown,
            but if the predicted opponent is wrong, then the LF value will be incorrect as well. The opponent LF value is only provided for convenience when the prediction is correct. It is useless when the prediction is wrong.
        </p>
        <p>
            Predictions are generated at the same time the GC ranking data is collected and updated. The specific time the GC data is updated may vary as the time that the in-game rankings themselves
            update to vary as well. But as a general rule, the earliest the data (on this site) can update will be 14-15 minutes after a match ends, but it is possible to take longer. If in-game GC ranking data has not updated
            at the scheduled time, then the updates will be scheduled in 5 minute intervals until rankings are successfully updated.
        </p>
        <p>
            Guild names displayed in the GC predictions page are the current guild names of the guilds. This is true even for past GCs. To see guild names used by the guild in past GCs, see the respective <NuxtLink to="#guild-page">guild's page.</NuxtLink>
        </p>
    </Panel>
    <Panel id="statistics" header="Statistics">
        <p>
            Statistics on the statistics page are aggregations of the collected data.
        </p>
        <p>
            Player login data is based off the login times from players that are currectly in guilds. This means that players who are not currently in a guild will be excluded from the data. If players were in a guild at one point, but later become guildless, they will still be included in the data, however
            they will be treated as having not logged in since their last login date. In summary, only logins of players in guilds will be counted. Additionally, only guilds that exist on the <NuxtLink to="#data-collection">guilds page</NuxtLink> of this website will be checked.
        </p>
    </Panel>

</template>

<script setup>

</script>