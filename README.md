# Workshop Stream

## What's this

## Configuration
- edit config.json

## Setup Twitter Accounts
- add screen_name to file twitter_accounts

## Setup Twitter User IDs
	for a in $(cat twitter_accounts); do echo $(curl --silent "http://www.idfromuser.com/getID.php?username=$a") >> twitter_user_ids; done

## Execute
	node streaming.js
