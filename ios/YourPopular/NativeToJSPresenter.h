/**
 * Native => React Native JS 通信
 * Author: GitHub
 * GitHub:https://github.com/crazycodeboy
 */

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

NS_ASSUME_NONNULL_BEGIN

@interface NativeToJSPresenter : RCTEventEmitter <RCTBridgeModule>

@end

NS_ASSUME_NONNULL_END
