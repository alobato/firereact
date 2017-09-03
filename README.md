Replace:

FIREREACT
SENDER_ID
FIREBASE_CREDENTIALS
ANALYTICS
.firebaserc

public/apple-touch-icon.png
public/favicon-32x32.png
public/favicon-16x16.png
public/favicon.ico
public/icon.png


Create a new Firebase project
https://console.firebase.google.com

Select project country

Click "Add Firebase to Web Application"

Copy credentials

Click: Authentication
Click: Configure Login Method

Enable email/password

Click: Hosting / Start

npm install -g firebase-tools

$ yarn build
$ firebase login
$ firebase init

Which Firebase CLI features do you want to setup for this folder?
> Hosting: Configure and d
eploy Firebase Hosting sites

Select a default Firebase project for this directory:
> 

What do you want to use as your public directory?
> build

Configure as a single-page app (rewrite all urls to /index.html)?
> Yes

File build/index.html already exists. Overwrite?
> No

$ yarn build && firebase deploy
