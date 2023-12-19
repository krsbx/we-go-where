# WeCharge APP

## Overview

WeCharge is a simple mobile app that show you how easy to use the WeCharge API.

## Stack

- [React Native](https://reactnative.dev/) - as cross-platform framework
- [Zustand](https://github.com/pmndrs/zustand) - as state management
- [RNEUI](https://github.com/react-native-elements/react-native-elements) - as for bootstraping UI
- [React Native Navigation](https://reactnavigation.org/) - as for routing
- [Zod](https://github.com/colinhacks/zod) - as validation

## Directory Structure

```
packages/wecharge
├── src
│   ├── components  # contains reuseable components for navigations/screens
│   ├── constans    # contains reuseable constants
│   ├── hooks       # contains reuseable hooks
│   ├── navigations # contains navigation routing for the app
│   ├── schemas     # contains schemas for data validation
│   ├── screens     # contains screens components
│   ├── store       # contains zustand data store
│   ├── styles      # contains global styles that can be applied elsewhere
│   ├── types       # contains custom type declarations
│   ├── utils       # contains utility functions
│   └── App.ts      # app starting point
├── .env
└── package.json
```
