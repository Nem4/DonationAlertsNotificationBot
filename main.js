const config_json = require('./config.json'); //(with path)
const TwitchJs = require('twitch-js').default;

// Get token and username which we will need to instantiate Twitch Chat
const token = config_json.token;
const username = config_json.username;

// Get all channels from config.json
const channels = config_json.channels;
const defaultPhrases = config_json.default_phrases;

// Instantiate clients.
const chat = new TwitchJs({token, username}).chat;

// Main function
const connectToChannel = async (channel) => {
    // Getting channels parameters from our config file
    const username = channel.username;
    const apiKey = channel.api_key;
    const phrases = channel.phrases;


    if (username === "test_user_AgantorGitDonationAlertNotificationBot" || username === "second_test_user_AgantorGitDonationAlertNotificationBot") {
        throw new Error("\n\n#################################################\nYOU HAVE TO CHANGE config.json!\n(YOU HAVE TO PUT YOUR OWN PARAMETERS)\n#################################################\n\n");
    }
    //  Trying to connect to twitch chat
    try {
        await chat.connect();
        await chat.join(username).then(() => {
            console.log(`CONNECTED TO ${username}`);
        });

        //  Initializing socket
        let socket = require('socket.io-client')
            .connect('wss://socket.donationalerts.ru:443',
                {
                    reconnection: true,
                    reconnectionDelay: 1000,
                    reconnectionDelayMax: 5000,
                    reconnectionAttempts: Infinity
                });

        //  Connection to donationsalerts socket
        if (socket !== null) {

            socket.on('connect', () => {
                socket.emit('add-user', {token: apiKey, type: 'minor'});
                console.log('DONATIONALERTS.RU:' + ' Successfully connected socket to service')
            });

            socket.on('reconnect_attempt', () => {
                console.log('DONATIONALERTS.RU:' + ' Trying to reconnect to service')
            });

            socket.on('disconnect', () => {
                console.log('DONATIONALERTS.RU:' + ' Socket disconnected from service')
            });

            // If we receive "donnation"
            socket.off('donation').on('donation', async (data) => {
                    console.log(`NEW DONATION TO ${username}`);
                    // Get data object and convert it to json
                    data = JSON.parse(data);

                    // If data is not empty
                    if (data.amount > 0) {

                        // Get random phrase from our phrases list
                        let randomPhrase = "";
                        if (phrases.length > 0)
                            randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
                        else
                            randomPhrase = defaultPhrases[Math.floor(Math.random() * defaultPhrases.length)];

                        // Add data(username, amount, currency, message) and put it to randomPhrase
                        randomPhrase = randomPhrase.replace("{username}", data.username);
                        randomPhrase = randomPhrase.replace("{amount}", data.amount);
                        randomPhrase = randomPhrase.replace("{currency}", data.currency);
                        randomPhrase = randomPhrase.replace("{message}", data.message);

                        // Send message to chat
                        await chat.say(username, randomPhrase);
                    }
                }
            )
        }
    } catch (e) {
        console.error(e);
    }
};

const start = () => {
    // For each channel in channels we call connectToChannel function

    // channel is an object from config.json which contains username, api_key and phrases
    channels.map(channel => connectToChannel(channel));
};

// Start bot
start();
