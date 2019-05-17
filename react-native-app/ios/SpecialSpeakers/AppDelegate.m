/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <React/RCTLinkingManager.h>
#import "AlipayManager.h"
#import <UMCommon/UMCommon.h>
#import <UMShare/UMShare.h>
#import "RNUMConfigure.h"


@implementation AppDelegate
  
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
  {
    
    [UMConfigure setLogEnabled:YES];
    [RNUMConfigure initWithAppkey:@"59f17f0aa40fa34aff000071" channel:@"App Store"];
    
    [self configUSharePlatforms];
    [self configUShareSettings];
    
    NSURL *jsCodeLocation;
    
#ifdef DEBUG
    jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
    jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
    
    RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                        moduleName:@"SpecialSpeakers"
                                                 initialProperties:nil
                                                     launchOptions:launchOptions];
    rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
    
    self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    UIViewController *rootViewController = [UIViewController new];
    rootViewController.view = rootView;
    self.window.rootViewController = rootViewController;
    [self.window makeKeyAndVisible];
    return YES;
  }

//处理AppDelegate中的回调
-(BOOL)openURLCallBackMethod:(NSURL *)url{
  BOOL result = [[UMSocialManager defaultManager] handleOpenURL:url];
  if(result){
    return result;
  }
  if ([url.host isEqualToString:@"safepay"]) {
    //支付宝
    [[AlipayManager sharedManager] dealWithAliPayCallBackUrl:url];
    return YES;
  }else{
    return NO;
  }
}


- (BOOL)application:(UIApplication *)application handleOpenURL:(NSURL *)url
{
  return [self openURLCallBackMethod:url];
}
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
  return [self openURLCallBackMethod:url];
}
//ios9之后
- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<NSString*, id> *)options
{
  NSLog(@"%@", url.scheme);
  if([url.scheme isEqualToString:@"wx6330d9d45fe49b04"]){
    return [RCTLinkingManager application:app openURL:url options:options];
  }else{
    return [self openURLCallBackMethod:url];
  }
}

- (void)configUSharePlatforms
{
  UMSocialManager *socialManager = [UMSocialManager defaultManager];
  
  [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_WechatSession appKey:@"wx63f0e9b11b8cc14d" appSecret:@"782a3e7b4f15a1fa0690b23ff63eba4d" redirectURL:@"http://mobile.umeng.com/social"];
  
  [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_QQ appKey:@"101529180" appSecret:nil redirectURL:@"http://mobile.umeng.com/social"];
  
  [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_AlipaySession appKey:@"2019021463225522" appSecret:nil redirectURL:@"http://mobile.umeng.com/social"];
  /* 删除新浪微博、微信收藏、QQ空间 */
  [socialManager removePlatformProviderWithPlatformType:UMSocialPlatformType_Sina];
  [socialManager removePlatformProviderWithPlatformType:UMSocialPlatformType_WechatFavorite];
  [socialManager removePlatformProviderWithPlatformType:UMSocialPlatformType_Qzone];
}

- (void)configUShareSettings
{
  /*
   * 打开图片水印
   */
  //[UMSocialGlobal shareInstance].isUsingWaterMark = YES;
  
  /*
   * 关闭强制验证https，可允许http图片分享，但需要在info.plist设置安全域名
   <key>NSAppTransportSecurity</key>
   <dict>
   <key>NSAllowsArbitraryLoads</key>
   <true/>
   </dict>
   */
  //[UMSocialGlobal shareInstance].isUsingHttpsWhenShareContent = NO;
  
}

  @end
