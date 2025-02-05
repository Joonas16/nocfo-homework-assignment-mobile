# Plant management App

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

![image](https://github.com/Joonas16/nocfo-homework-assignment-mobile/blob/main/assets/images/assigment-image.png?raw=true)

## How to run the App

1. Clone the repository

2. Install dependencies

```
pnpm install
```

3. Run the App

```
pnpm dev
```

## Architecture and Technical Decisions

### Architecture

The app is built using React Native, which allows for cross-platform development.

**TypeScript**: TypeScript is used for type safety and better developer experience.\
**Navigation**: Expo Router with file based routing\
**State Management**: The app uses React's built-in state management (context) for managing component state.

`/db` folder would normally include other stuff related to database and API's, but for the demo, there is only context

### Technical Decisions

**Styling**: Nativewind & [React Native Reusables](https://rnr-docs.vercel.app/getting-started/introduction/) for quick and easy styling.
