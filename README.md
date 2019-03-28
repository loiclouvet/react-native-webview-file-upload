# react-native-webview-file-upload-android
ReactNative's WebView on Android does not support file input. This library
adds in an `<AndroidWebView>` that does support file input, as well adding 
support for a number of other missing pieces, listed below.

*PLEASE READ THE LIMITATIONS SECTION FIRST*

The lack of support appears to be due to Android-level limitations -
specifically that there is no API available for this prior to Android 5 (except
kind of between 4 and 4.4.1 possibly, hard to read from discussions? And using
undocumented APIs prior? Very spotty APIs anyway, and not built-in to WebView)

<!-- MarkdownTOC -->

- [Things this library adds:](#things-this-library-adds)
- [React Native Version Compatibility](#react-native-version-compatibility)
- [Limitations](#limitations)
- [Further background reading](#further-background-reading)
- [Requirements](#requirements)
- [Installation](#installation)
    - [Manual Linking](#manual-linking)
    - [Automatic Linking](#automatic-linking)
- [Usage](#usage)
- [Contributing](#contributing)

<!-- /MarkdownTOC -->

## Things this library adds:
 - File input for any type of file
 - Support for downloading files using the Android DownloadManager
 - Permission requests for Android SDK Version >26 (required for new Play Store 
 builds now, and for updates from November 2018)

Note that this project scope has slightly expanded beyond its original scope
(originally it only added file upload), and it may not retain compatibility 
with all versions of React Native - see the section below for compatibility 
notes.

## React Native Version Compatibility

Version 1.0.0 of this has been tested on React Native 0.56.0.

Previous known stable compatibilities include:
 - `0.4.2` of this library is compatible with React 
    Native 0.40.0
 - Commit: "github:oblongmana/react-native-webview-file-upload-android#4f8c1a775750788dc2464dea8dd189b7a41ea17b"
    is compatible with React Native 0.44.0

To use a specific commit of this repo, add the following to your `package.json`, 
where `COMMIT_SHA` is the SHA of the commit you wish to use:
```
"react-native-webview-file-upload-android": "github:oblongmana/react-native-webview-file-upload-android#[COMMIT_SHA]"
```

## Limitations
- This is untested on most Android platforms at time of writing. This was tested
in an AVD with following config: Nexus 5X API 26 x86.

- This only works with Android - specifically, it DOES NOT defer to react-native
built-in WebView for iOS. If supporting both platforms, you will need to include
platform-specific code, using `AndroidWebView` only in iOS (see
https://facebook.github.io/react-native/docs/platform-specific-code.html). For
Image Upload from Gallery in iOS however, this is as simple as ensuring your
`info.plist` contains a `NSPhotoLibraryUsageDescription` entry.

## Further background reading
The following threads provide some further technical background as to the need
for this library, and implementation. These may be of use if modifying this
library.
- https://github.com/facebook/react-native/pull/12807
- https://github.com/facebook/react-native/issues/11230
- https://github.com/facebook/react-native/issues/5219

## Requirements
This has been tested with (and has a peerDependency in package.json on
`react-native` `^0.56.0`). Please see the compatibility section above for 
further information on compatibility with earlier versions. This version of 
the library _might_ work with earlier versions of React Native. If it does,
please open a PR amending the peerDependencies in package.json.

## Installation

Install the library into your project
`npm install react-native-webview-file-upload-android --save`

### Manual Linking

Add the library to the end of the `dependencies` section of your
`android/app/build.gradle`:

```diff
 dependencies {
     //...
+    compile project(':react-native-webview-file-upload-android')
 }
```

Add the library to your `android/settings.gradle`. Don't clobber any other third
party libraries you might be including though! Example of adding to a file with
no other libraries:
```diff
 rootProject.name = 'YourAppName'

-include ':app'
+include ':app', ':react-native-webview-file-upload-android'
+project(':react-native-webview-file-upload-android').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-webview-file-upload-android/android')
```


Add the library's React Package to your `MainApplication.java` (location will
differ from project to project):
```diff
 //...
+import com.oblongmana.webviewfileuploadandroid.AndroidWebViewPackage;

 //...

 public class MainApplication extends Application implements ReactApplication {
     //...
     @Override
     protected List<ReactPackage> getPackages() {
         return Arrays.<ReactPackage>asList(
             new MainReactPackage(),
+            new AndroidWebViewPackage()
         );
     }
     //...
 }
```
### Automatic Linking
Automatic linking as not been tested, so no guarantees that will work. If you
want to try it, use:
```shell
react-native link react-native-webview-file-upload-android
```
And if that does work, please feel free to edit this README!

## Usage
Simply use the `<AndroidWebView>` anywhere you would usually use a `<Webview>`.
As mentioned above, if you are support bothing iOS and Android, you will need
platform-specific code, as `<AndroidWebView>` does not support iOS.

As noted above in the Limitations section, this library currently only
allows for image input, but could be modified to accept other file inputs. As
such, only the image capture will work. If you modify the library to accept
other inputs, I encourage you to submit a PR!

e.g.
Just to reiterate, note that the source URI below contains tests for multiple
types of media capture, but only image capture is presently supported using
this library. See the Usage notes above, and the Limitations section.
```jsx
import React, { Component} from 'react';
import { WebView, View, Platform } from 'react-native';
import AndroidWebView from 'react-native-webview-file-upload-android';
//...
class MySuperSpecialWebView extends Component {
  render() {
    return (
      <View style={{flex:1}}>
        {Platform.select({
              android:  () => <AndroidWebView
                                source={{ uri: 'https://mobilehtml5.org/ts/?id=23' }}
                              />,
              ios:      () => <WebView
                                source={{ uri: 'https://mobilehtml5.org/ts/?id=23' }}
                              />
        })()}
      </View>
    );
  }
}
```

## Contributing
As noted enthusiastically above, contributions are very welcome. Apologies if I 
don't get round to reviewing any PRs in a timely manner. I'd encourage you to
put instructions for utilising your own fork in any PRs you open against this,
so Googlers coming across whatever you add can use your contribution with minimal
friction, if I haven't merged it.

This project includes an `.eslintrc.json` file, and any contributions should
comply with this. My personal dev environment was Sublime Text 3, using
- https://github.com/SublimeLinter/SublimeLinter3
- https://github.com/roadhump/SublimeLinter-eslint
- https://github.com/babel/babel-sublime

While developing locally, I would suggest you have a test react-native project
which has a local copy of this library as a dependency. You can accomplish this
by adding
`"react-native-webview-file-upload-android": "file:../react-native-webview-file-upload-android"`
to your `package.json` `dependencies` (obviously, alter the `file:` url to
point to your local copy).

HOWEVER, if you do so, you MUST install using `yarn` instead of `npm`, as `npm` 5+
installs local `file` dependencies using symlinks. This would be a great feature
if react native's metro bundler didn't completely break on symlinks - this issue
has existed since metro's inception, with no sign of a fix in sight: https://github.com/facebook/metro/issues/1.
