
#### 项目开发调试
----


#### 一、如何开启Developer Menu

``` 
1.iOS模拟器：可以通过 Command + D 快捷键来快速打开 Developer Menu。
2.Android模拟器：可以通过 Command + M 快捷键来快速打开 Developer Menu。也可以通过模拟器上的菜单键来打开。
3.在真机上开启 Developer Menu：在真机上你可以通过摇动手机来开启 Developer Menu。
```

#### 二、如何开启真机调试

##### iOS 真机调试
``` 
打开 RCTWebSocketExecutor 文件，将 localhost 改为你的电脑IP，然后在 Developer Menu 下单击 Debug JS Remotely 启动 JS 远程调试功能。
```

##### Android 真机调试

``` 
第一步：手机连接至电脑，并打开“USB调试”
adb devices
#通过命令查看到所有的设备

第二步：在真机Debug Android项目
一般是先在 Android Studio 打开项目，点击运行项目，然后选择已经连接的设备，点击OK，即可在设备上运行项目，但前提是设备已经打开了“USB调试”。

第三步：运行项目
通过命令打开命令，将可以 Debug 项目
react-native start
react-native run-android

第四步：打开调试菜单
手机设备可以通过[摇一摇]设备打开调试菜单。
```

