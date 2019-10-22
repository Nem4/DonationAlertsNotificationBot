# DonationAlertsNotificationBot
Simple NodeJS Twitch Bot for **[Donation Alerts](https://www.donationalerts.com/)** which will send a message to the chat if someone donates.

***
## ⚠️For it to work you'll need⚠️:
### In  *config.json*  you should insert your parameters:
  1. Twitch Bot with **username** and **token**; 
      - You can get your token here: **[Twitch Chat OAuth Password Generator](https://twitchapps.com/tmi/)**
  2. List of **channels** to connect to(or you can put only one) with **username**, **api_key**, **phrases** (optional) where: 
      - **username** is twitch channel name. (Ex. For https://www.twitch.tv/fyiden username will be **fyiden**)
      - **api_key** is an API key (token) from Donations Alerts which you can find **[HERE(click):](https://www.donationalerts.com/dashboard/alert-widget)**
      ![Image 1](https://i.imgur.com/9kigRjr.jpg "Image 1")
      ![Image 2](https://i.imgur.com/xqrKpnF.jpg "Image 1")
      - **phrases** is a list of phrases, one of which(random one) will be sent with a message to the chat.
  3. **default_phrases** is a list of phrases, one of which(random one) will be sended with a message to the chat in case where list of "custom" channel phrases is empty.

### To run  *main.js* :
  1.  You'll need to install all dependencies:
      - In comand line (i'm using Windows 10) move to project folder `cd ..PATH_TO_FOLDER/DonationAlertsNotificationBot`
      - Run `npm install`
  2. Run ***main.js*** by calling `node main.js`
  
***
##### Pretty sure you can do whatever you want with this kind of "bot" (with its data). 
##### Example: "custom" notifications (generating web pages and using them in OBS/StreamlabsOBS), interacting with stream, creating effects (animations) that will depend on the amount of donation etc. 
