const config = require('../config.json');
const charms = require('./charms.json');
const RtmClient = require('@slack/client').RtmClient;
const {CLIENT_EVENTS, RTM_EVENTS} = require('@slack/client');

const GphApiClient = require('giphy-js-sdk-core')
const bot_token = process.env.SLACK_BOT_TOKEN || config.SLACK_BOT_TOKEN;
const giphyClient = GphApiClient(config.GIPHY_API_TOKEN)
const rtm = new RtmClient(bot_token);
const channelId = config.SLACK_BOT_TEST_CHANNEL;
const ALOHOMORA_PATTERN = /ALOHOMORA/i

let myId;

rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function (rtmStartData) {
    myId = rtmStartData.self.id
    console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
});

rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function () {
    rtm.sendMessage("Wingardium Leviosa, Horry Portier on duty", channelId);
});

rtm.on(RTM_EVENTS.MESSAGE, function({text, user, channel}) {
    if (text && text.match(ALOHOMORA_PATTERN)) {
        const randomCharm = charms[Math.floor(Math.random()*charms.length)];
        rtm.sendMessage(
            `<@${user}> ... ${randomCharm.name.toUpperCase()}!!!! \n (_${randomCharm.effect}_)`,
            channel
        )

        giphyClient.random('gifs', {"tag": 'harry potter'})
        .then((response) => {
            rtm.sendMessage(response.data.images.fixed_height_downsampled.gif_url, channel)
        })
        .catch((err) => {
            rtm.sendMessage('nie ma manny, dzisiaj bez gifa... :( ', channel)
        })
    }

    if (text && text.indexOf(`<@${myId}>`) > -1 && user !== 'USLACKBOT') {
        rtm.sendMessage(`<@${user}> do mnie mówisz?`, channel)

        giphyClient.gifByID('j425AE3eu9eOk')
        .then((response) => {
            rtm.sendMessage(response.data.images.fixed_height_downsampled.gif_url, channel)
        })
        .catch((err) => {
            rtm.sendMessage('nie ma manny, dzisiaj bez gifa... :( ', channel)
        })
    }
})

rtm.start();
