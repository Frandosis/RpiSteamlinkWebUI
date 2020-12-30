# Raspberry Pi Steamlink Web UI.
Steamlink web interface designed for launching the steamlink application for RPi 3B+ already installed.
This is in order to have an easy to access and control the steamlink application.

The webapplication is an Node.JS Express webapplication using Socket.IO, it is then set up to host an webapplication server on \<hostname\>:3000. This is port 3000 on the RPi.
In order to restart on failure, there is an linux service script included. When enabling this service, the webapplication will be launched on boot.

# Technologies
1. Node.JS v10.21.0
2. Express.JS v4.16.1
3. Socket.IO v3.0.4
4. HTML5 Canvas
4. Raspberry Pi Steam Link App
5. Linux Systemd

# Installation
There are several dependencies for this project.
## Steamlink
Installation of the steamlink application is pretty simple. Valve guarantees maximum compatibility with Raspberry Pi 3B+ or higher. Attempting to run this application on older versions are at own risk.

```
sudo apt update
sudo apt upgrade
sudo apt install steamlink
```
[For more information](https://support.steampowered.com/kb_article.php?ref=6153-IFGH-6589 "Steam Link App")
## Node.js
In order to run this project you need to install Node.js and NPM on your Pi.

```
sudo apt update
sudo apt upgrade
sudo apt install nodejs
```
This should install Node.js which is an Javascript runtime environment based on Chrome Javascript engine. This will allow you to run javascript projects locally on your Pi.

After pulling the project you have to navigate into the steamlink project folder. Then install all project dependencies using NPM.
```
cd path/to/project
npm install
```
Then npm will install all node modules as described by the package.json file.

## Linux service script.
The service script is designed for an easy running of the webapplication. But it needs some individual changes in the script.

```
[Unit]
Description=Node.js Steamlink launcher web application

[Service]
PIDFile=/tmp/steamlinkweb-99.pid
User=<user with steamlink installed>
Group=<user to the group>
Restart=always
KillSignal=SIGQUIT
WorkingDirectory=path/to/steamlink/
ExecStart=path/to/steamlink/bin/www

[Install]
WantedBy=multi-user.target

```
Working folder path should be the absolute path to the project folder. The execstart is the absolute path to the sub-binary /bin/www.
```
cp path/to/folder/steamlinkweb.service /etc/systemd/system/
```
# Launching

There several ways to launch this project.

## NPM launch
There are two ways to start for the project for development purposes. Navigate into project folder.
```
npm run start
```
or
```
npm run devstart
```
start launches the webapplication as is on port 3000 if port is unused.

While devstart uses nodemon, this extension restarts the server on file changes and allows faster and easier development.

## Linux service.
Alternative the app can be launched as an linux service.

It can be started and stopped at current session.
```
systemctl start steamlinkweb.service
systemctl stop steamlinkweb.service
```
It can also be enabled to run on boot or disabled again.
```
systemctl enable steamlinkweb.service
systemctl disable steamlinkweb.service
```
Check service status.
```
systemctl status steamlinkweb.service
```
# Enjoy
Enjoy this nice little interface for the steamlink app. Now you don't have to directly access the pi everytime you want to play steam games on it.
