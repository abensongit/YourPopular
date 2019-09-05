/**
 * React Native JS => Native 通信
 * Author: GitHub
 * GitHub:https://github.com/crazycodeboy
 */

#import "JSBridgeModule.h"


@implementation JSBridgeModule


// 步骤：注册模块
// 注意：所有实现 RCTBridgeModule 协议的类都必须显示的使用 RCT_EXPORT_MODULE() 宏命令。
// 作用：该宏命令自动为该类注册为JS端的模块,当 Object-C Bridge 加载的时候。这个类注册的模块可以被 JavaScript Bridge 调用。当然该宏可以接受一个参数作为注册的模块名，默认值是该类的名称。
RCT_EXPORT_MODULE();


// 步骤：注册方法
// 注意：注册完模块之后，还需要注册模块下需要暴露给JS的方法。
// 注意：此处注册的方法要求不能有返回值，返回值必须为 void 空。
// 注意：此处使用 RCTPromiseResolveBlock 与 RCTPromiseRejectBlock 两种类型的回调，分别代表成功和失败。
RCT_EXPORT_METHOD(sendMessage:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  
  // 接受RN发过来的消息，并处进行处理
  NSLog(@"React Native => Native 通信：%@", params);
  
  // 原生OC调用RN方法
  NSNotificationCenter * notificationCenter = [NSNotificationCenter defaultCenter];
  [notificationCenter postNotificationName:@"fireData"
                                    object:@{ @"JSFunctionName":@"callReatNativeJS", // RN注册的函数名称
                                              @"JSFunctionParams":params
                                              }];
  
  // 回调RN并返回数据
  resolve(@"ReactNative => Native => Success");
}


// 步骤：RN调用OC的回调
// 注意；typedef void (^RCTResponseSenderBlock)(NSArray *response) 实现 Native 到 React Native JS 的数据回传。
// 作用：暴露给了JS一个简单的两个整数之间的加法运算，并将运算结果回传给JS。
// 说明：它接收了一个叫做 response 的 NSArray 的参数，其中 response[0] 代表着错误信息 error，如果没有错误则传入null，即[NSNull null]，后面的参数传入自定义的内容。
RCT_EXPORT_METHOD(sendWithCallback:(RCTResponseSenderBlock)callback)
{
#if 0
  callback(@[@"error", [NSString stringWithFormat:@"something is wrong"]]);
#else
  callback(@[[NSNull null], [NSString stringWithFormat:@"Call Back From Native"]]);
#endif
}


// JavaScript 代码都是单线程运行的，而调用到Native模块时都是默认运行在各自独立的线程上，所以可知RN调用Native的时候都是异步的。
// 因此若是调用的Native方法有需要操作UI的，必须指定在主线程中运行，否则会出现一些莫名其妙的问题。
// 比如RN调用的Native方法里需要弹出原生的 UIAlertView ，则可以在操作 UIAlertView 的时候用 GCD 切换到主线程：
// dispatch_async(dispatch_get_main_queue(), ^{
//   // 操作UI
//});
// 如果需要对整个导出的类都指定到某个特定的线程中去运行，那么在每个导出的方法里用 GCD 的方式去切换线程会显得很繁琐，则可以在类中实现 methodQueue 方法。
// 只要实现了该方法并返回了特定的线程，那么该类下所有的方法在被RN调用时都会自觉的运行在该方法指定的线程下。
- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue(); // 让RN在主线程回调这些方法
}


@end

