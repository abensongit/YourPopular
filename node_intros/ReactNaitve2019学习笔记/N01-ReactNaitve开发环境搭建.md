# iOS 平台开发环境搭建


#### 一、开发工具（WebStorm/VS Code/Nuclide/Sublime）


#### 二、开发环境搭建

````
方式一 => 纯JavaScript的项目 => Expo

// Step1.安装 Node.js

// Step2.安装 Expo
npm install expo-cli --global

// Step3.创建项目
expo init my-new-project
cd my-new-project
expo start


方式二 => 混合原生项目 => React Native

// 安装：Node、Watchman
brew install node
brew install watchman

// 安装： Yarn、命令行工具（react-native-cli）
npm install -g yarn react-native-cli

// 创建项目并运行
react-native init AwesomeProject
cd AwesomeProject
react-native run-ios
````
