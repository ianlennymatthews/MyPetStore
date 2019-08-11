# Project Overview: BoxKnight Developer Challenge

## Table of Contents

1. [Overview](#overview)
1. [Requirements](#requirements)
1. [Usage](#usage)
1. [Tools Used](#tools-used)

## Overview

#### Client Interface:

![interface](https://media.giphy.com/media/W0VV1LHnrMgOvwuEs1/giphy.gif)

## Requirements

- Node v10.13.0 (LTS as of May 2019) or higher

## Usage

#### Server

> The server side is built using Node/Express:
>
> 1. Install dependencies with `npm install`
> 2. The path for the main server file is `server/server.js`
>    -- If nodemon is already installed globally (it is not part of the dependencies), you may start the server via `npm run start:dev` for development purposes or `npm start` for production
>    -- The server uses port 3001 by default!

#### Client

> The client side is built using React/Webpack:
>
> > `npm run build:dev`: Builds the client-side files in development mode and does not do full bundling. This also activates watch mode by default so it rebuilds whenever you make and save changes
>
> > `npm run build`: Builds the client-side files in production mode, with full bundling. This reduces file size, but is less useful in debugging (some errors do not provide as much detail as in development mod

## Tools-Used

- Front-End: React, React-Bootstrap, Axios
- Back-End: Body-Parser, Node, Express, Nodemon, Axios
