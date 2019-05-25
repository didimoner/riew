# Reiw - Presentation Broadcast System


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You will need the latest version of Node with npm to build and run this app. After installiation, clone this repo and modify config.json in client\src folder.

* **adress** - ip-adress of a machine that will run app;
* **port** - server port;
* **document** - name of a .pdf file that you want to broadcast. Place .pdf into server\shared.

### Installing

Simply run these commands to install all the packages and build apps:

```
$ cd riew
$ npm run setup
```

Use these commands to run server or client app:
 
```
$ npm run server
$ npm run client
```

To open the app just run web-browser, type %app_ip_apdess%:8080 to open viewer, and /control.html to open clicker. 
Default password for clicker app - *test*. 
You can change it in server\src\index.js; change the value of *password* variable.
