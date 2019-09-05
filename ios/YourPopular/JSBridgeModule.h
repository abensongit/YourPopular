/**
 * React Native JS => Native 通信
 * Author: GitHub
 * GitHub:https://github.com/crazycodeboy
 */

#import <React/RCTBridgeModule.h>

NS_ASSUME_NONNULL_BEGIN

// RCTBridgeModule，实现该协议的类，会自动注册到 Object-C 对应的 Bridge 中。
@interface JSBridgeModule : NSObject <RCTBridgeModule>


@end

NS_ASSUME_NONNULL_END
