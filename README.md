# ionic-frontend
## Requirements for use
### Super Easy Install

+ installed node_modules
  + npm install

After that, we can launch the app using
```
npm run start 
```

### Build IOS

For build ios app you need use this command
```
npm run build
sudo gem install cocoapods
```
And install the Xcode Command Line tools (either from Xcode, or running `xcode-select --install`).
Now you can run 

`npx cap open ios` to launch Xcode

Connect you device and run this app.

### Build Android

For build android app you need use this command
```
npm run build
```
Next, you need to install Android studio from the official site.

+ https://developer.android.com/studio/install

Now you can run 

`npx cap open android` to launch Android studio

Next, you need to enable `usb debugging` and `install via USB` in the device developer options.

Connect you device in Android studio via `Tools/Troubleshoot device connection` and run this app.
