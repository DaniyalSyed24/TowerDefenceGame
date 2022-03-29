# tower-defence-game
PSP assessment for IBM
- Jack Smith
- Rui Sun
- Steven Redmile
- Daniyal Syed

# Installation guide
1. Install and run wamp64 (https://sourceforge.net/projects/wampserver/files/WampServer%203/WampServer%203.0.0/wampserver3.2.6_x64.exe/download)
2. Download the project
3. Place the project files into ```wamp64/www```

The project can be run by visiting ```localhost/tower-defence-game/``` using a browser of your choice.

# Database setup
1. Go to ```localhost/phpmyadmin```
2. Sign in (by default, the username is ```root``` and there is no password)
3. On the left pane, click ```New``` to create a new database
4. Create a new database named ```test```, change the format (dropdown menu) to ```utf8_general_ci```
5. Under ```create table```, name the new table ```users``` and give it three columns.
6. Name the three fields: ```ID```, ```username```, ```password``` (case sensitive)
7. Set username and password to ```VARCHAR```, leave ID as ```INT```
8. Set the length of all three fields to 255
9. Check ```A I``` (auto-increment) for ID
