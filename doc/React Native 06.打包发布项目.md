### React Native 打包发布项目

#### 一、打包 iOS 项目

``` 
// 第一步：导出 jsbundle 包和图片资源
react-native bundle --entry-file index.js --platform ios --dev false --bundle-output ./bundles/main.jsbundle --assets-dest ./bundles

// 第二步：将 jsbundle 包和图片资源导入到iOS项目中

// 第三步：发布 iOS 应用

```

#### 二、打包 Android 项目

``` 


```
