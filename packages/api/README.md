# WeCharge API

## Overview

WeCharge provides an API that allows you to:

- Create, read, update, and delete customers
- Create, read, delete, and charge credit cards

## Stack

- [Hono](https://github.com/honojs/hono) - As back-end framework
- [MongoDB](https://www.mongodb.com) - As database
- [Omise](https://www.opn.ooo/th-en) - As payment gateway

## Directory Structure

```
packages/api
├── src
│   ├── bin         # contains binaries/instances that need to be called onces
│   ├── controllers # contains controllers/middleware for each services
│   ├── errors      # contains error handler/request error
│   ├── instances   # contains reuseable object instances (e.g. Omise)
│   ├── models      # contains database models
│   ├── routes      # contains routes for each services
│   ├── schemas     # contains schemas for data validation
│   ├── services    # contains functions to business logic
│   ├── utils       # contains utility functions
│   └── index.ts    # api starting point
├── .env
└── package.json
```
