#!/bin/bash

function add_user_id {
	a=$1
	account=$(curl --silent "http://www.idfromuser.com/getID.php?username=$a")
	if [ "$account" == "" ]; then
		echo "Can not convert user_id screen_name: $a"
	else
		echo $account >> twitter_user_ids; 
	fi
}

if [ "$1" == "" ]; then
	if [ ! -f 'twitter_accounts' ]; then
		echo "Does not exits twitter_accounts"
		exit 1;
	fi

	if [ -f 'twitter_user_ids' ]; then
		rm -i twitter_user_ids
	fi

	for a in $(cat twitter_accounts); do 
		add_user_id $a
	done
else
	add_user_id $1
fi
