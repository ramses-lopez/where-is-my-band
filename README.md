# Where is my band :metal:

Web application made with :heart: by [irvingv8](http://irvingv8.github.io) and
[ramses-lopez](http://ramses-lopez.github.io) for VanHackaton 4.0.

Site is Available at: https://ramses-lopez.github.io/where-is-my-band/

Where is my band (WIMB) is a React single page application, jumpstarted with
[Create-React-App](https://github.com/facebookincubator/create-react-app), which
pulls data from the public API of
[bandsintown.com](https://www.bandsintown.com).

_WIMB_ allows you to search for your favorite band, read a little excerpt from
its Wikipedia page, check its upcoming presentations, and check the location of
the venue in google maps. Also, it saves the last artist you searched for later!

## How to use WIMB

You will need:

* A recent version of [NodeJS](https://nodejs.org/)
* Connection to the internet :rocket:

### Clone the repository

```shell
git clone git@github.com:ramses-lopez/where-is-my-band.git
```

### Install dependencies with your favorite package manager

```shell
yarn install #or npm install
```

### Start the application

```shell
npm start
```

## WIMB include some tests

```shell
npm test
```

### How to deploy :shipit:

After cloning the repo and installing all dependencies, you can do `npm eject`
to separate the app from Create React App, and deploy it using any standard web
server, such as Nginx, NodeJS + ExpressJS, or any other web server.

Being a SPA, it is very CDN friendly.
