/**
 * Native => React Native JS 通信
 * Author: GitHub
 * GitHub:https://github.com/crazycodeboy
 */

#import "NativeToJSPresenter.h"

/*
 实现Native到JS的通信所需要的步骤
 首先要实现 RCTEventEmitter <RCTBridgeModule>；
 通过 RCTEventEmitter 的 sendEventWithName 方法将数据传递给JS；
 */

@implementation NativeToJSPresenter

@synthesize bridge = _bridge;


// 步骤：注册模块
// 注意：所有实现 RCTBridgeModule 协议的类都必须显示的使用 RCT_EXPORT_MODULE() 宏命令。
// 作用：该宏命令自动为该类注册为JS端的模块,当 Object-C Bridge 加载的时候。这个类注册的模块可以被 JavaScript Bridge 调用。当然该宏可以接受一个参数作为注册的模块名，默认值是该类的名称。
RCT_EXPORT_MODULE();


// 注意：该方法用于指定能够发送给JS的事件名，所以发送给JS的eventName一定要在这个方法中进行配置否则无法发送。
- (NSArray<NSString *> *)supportedEvents
{
  // ReactNative中注册的JavaScript函数名称
  return @[@"callReatNativeJS"];
}


- (instancetype)init
{
  if (self = [super init]) {
    // 在 module 初始化的时候注册 fireData 广播
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(fireData:) name:@"fireData" object:nil];
  }
  return self;
}


- (void)fireData:(NSNotification *)notification
{
  NSString *eventName = notification.object[@"JSFunctionName"];
  NSDictionary *params = notification.object[@"JSFunctionParams"];
  NSDictionary *body = @{
                         @"title": eventName,
                         @"content": params[@"param"]
                         };
  [self sendEventWithName:eventName body:body];
}

- (void)dealloc
{
  [[NSNotificationCenter defaultCenter] removeObserver:self name:@"fireData" object:nil];
}

@end

