This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Storybook

1. https://www.chromatic.com/library?appId=66adc2c0c12c345e70e76d41 접속
2. View storybook 클릭

# Getting Started

## 프로젝트 환경

react-native 기반으로 앱 개발을 하고 있으며, 모든 페이지들은 웹뷰로 표시됩니다.

- 웹뷰 표시: [react-native-webview](https://github.com/react-native-webview/react-native-webview)
- 모바일 앱 환경 구성을 위해 프로젝트의 root는 react-native cli로 초기화 되었습니다.

웹 프로젝트는 `/web`에 mono repo 형식으로 구성되어 있습니다.

> **Note**: 아래 내용은 react-native project의 document 내용입니다.
> 웹에 관련된 [document는 이곳](./web#readme)을 참고해주세요.

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 0: Install

해당 레포는 pnpm을 사용하고 있습니다.
pnpm을 사용하여 install 해주세요.

```bash
pnpm i
```

모든 페이지는 앱 내부에 웹뷰로 표시됩니다.
반드시 `/web` 폴더로 이동하여 웹 구동을 해주세요.

```bash
cd ./web
pnpm dev
```

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using pnpm
pnpm start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using pnpm
pnpm run android
```

### For iOS

```bash
# using pnpm
pnpm run ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
