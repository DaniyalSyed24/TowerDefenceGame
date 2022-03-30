# tower-defence-game
PSP assessment for IBM
- Jack Smith
- Rui Sun
- Steven Redmile
- Daniyal Syed
- Ike Olatunji
- Haleem Hussain

# Installation guide
1. Install and run wamp64 (https://sourceforge.net/projects/wampserver/files/WampServer%203/WampServer%203.0.0/wampserver3.2.6_x64.exe/download)
2. Download the project
3. Place the project files into ```wamp64/www```

The project can be run by visiting ```localhost/tower-defence-game/``` using a browser of your choice.

# Database setup
1. Go to ```localhost/phpmyadmin```
2. Sign in (by default, the username is ```root``` and there is no password)
3. On the left pane, click ```New``` to create a new database
4. Create a new database named ```test2```, change the format (dropdown menu) to ```utf8_general_ci```
5. Under ```create table```, name the new table ```users``` and give it eleven (11) columns.
6. Name the first three fields: ```ID```, ```username```, ```password``` (case sensitive)
7. The rest of the fields are named ```badge1```, ```badge2``` and so on up until ```badge8```
8. Set username and password to ```VARCHAR```, leave ID as ```INT```
9. Set the length of ```ID```, ```username``` and ```password``` to 255
10. Set the length of each ```badge``` field to 1
11. Set each ```badge``` field to default to 0
12. Check ```A I``` (auto-increment) for ID
