//  UMShareModule.m
//  Created by zhangjianyang on 2018/11/01.

#import "UMShareModule.h"

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <UMShare/UMShare.h>
#import <UMShare/UMSocialManager.h>
#import <UShareUI/UShareUI.h>

@implementation UMShareModule
RCT_EXPORT_MODULE(UMShareModule)

- (UMSocialPlatformType)configPlatform: (NSInteger) platformType {
  
  UMSocialPlatformType type = UMSocialPlatformType_Sina;
  switch (platformType) {
    case 0:
      type = UMSocialPlatformType_Sina;
      break;
    case 1:
      type = UMSocialPlatformType_WechatSession;
      break;
    case 2:
      type = UMSocialPlatformType_WechatTimeLine;
      break;
    case 3:
      type = UMSocialPlatformType_WechatFavorite;
      break;
    case 4:
      type = UMSocialPlatformType_QQ;
      break;
    case 5:
      type = UMSocialPlatformType_Qzone;
      break;
    case 6:
      type = UMSocialPlatformType_AlipaySession;
      break;
    default:
      break;
  }
  return type;
}

/**
 * 弹出分享面板
 */
RCT_EXPORT_METHOD(showShareMenus:(RCTResponseSenderBlock)callback){
  dispatch_async(dispatch_get_main_queue(), ^(void){
    [UMSocialUIManager showShareMenuViewInWindowWithPlatformSelectionBlock:^(UMSocialPlatformType platformType, NSDictionary *userInfo) {
      callback( [[NSArray alloc] initWithObjects:@(platformType), nil]);
    }];
  });
}

/**
 * 图片分享
 */
RCT_EXPORT_METHOD(shareImage:(NSString*)imagePath platformType:(NSInteger)platformType callback:(RCTResponseSenderBlock)callback){
  
  //创建分享消息对象
  UMSocialMessageObject *messageObject = [UMSocialMessageObject messageObject];
  //创建图片内容对象
  UMShareImageObject *shareObject = [[UMShareImageObject alloc] init];
  //如果有缩略图，则设置缩略图本地
  UIImage * image = [UIImage imageWithContentsOfFile:imagePath];
  shareObject.thumbImage = image;
  [shareObject setShareImage:image];
  //分享消息对象设置分享内容对象
  messageObject.shareObject = shareObject;
  
  dispatch_async(dispatch_get_main_queue(), ^{
    
    //调用分享接口
    [[UMSocialManager defaultManager] shareToPlatform:[self configPlatform: platformType] messageObject:messageObject currentViewController:nil completion:^(id data, NSError *error) {
      NSString *message = @"分享成功";
      if (error) {
        UMSocialLogInfo(@"************Share fail with error %@*********",error);
        message = @"分享失败";
      }else{
        if ([data isKindOfClass:[UMSocialShareResponse class]]) {
          UMSocialShareResponse *resp = data;
          //分享结果消息
          UMSocialLogInfo(@"response message is %@",resp.message);
          //第三方原始返回的数据
          UMSocialLogInfo(@"response originalResponse data is %@",resp.originalResponse);
          
        }else{
          UMSocialLogInfo(@"response data is %@",data);
        }
      }
      callback( [[NSArray alloc] initWithObjects:message, nil]);
    }];
  });
}

// 图文分享
RCT_EXPORT_METHOD(share:(NSString*)title descr:(NSString*)descr
                  webpageUrl:(NSString*)webpageUrl
                  thumbURL:(NSString*)thumbURLl
                  NSInteger:(NSInteger)platformType
                  callback:(RCTResponseSenderBlock)callback
                  )
{
  //创建分享消息对象
  UMSocialMessageObject *messageObject = [UMSocialMessageObject messageObject];
  //创建网页内容对象
  NSString* thumbURL =  thumbURLl;
  UMShareWebpageObject *shareObject = [UMShareWebpageObject shareObjectWithTitle:title descr:descr thumImage:thumbURL];
  //设置网页地址
  shareObject.webpageUrl = webpageUrl;
  //分享消息对象设置分享内容对象
  messageObject.shareObject = shareObject;
  
  dispatch_async(dispatch_get_main_queue(), ^{
    //调用分享接口
    [[UMSocialManager defaultManager] shareToPlatform: [self configPlatform: platformType]  messageObject:messageObject currentViewController:nil completion:^(id data, NSError *error) {
      NSString *message = @"分享成功";
      if (error) {
        UMSocialLogInfo(@"************Share fail with error %@*********",error);
        if(error.code == 2009){
          message = @"取消分享";
        }else{
          message = @"分享失败";
        }
      }else{
        if ([data isKindOfClass:[UMSocialShareResponse class]]) {
          UMSocialShareResponse *resp = data;
          //分享结果消息
          UMSocialLogInfo(@"response message is %@",resp.message);
          //第三方原始返回的数据
          UMSocialLogInfo(@"response originalResponse data is %@",resp.originalResponse);
          //          code = @"200";
          //          message = resp.originalResponse;
        }else{
          UMSocialLogInfo(@"response data is %@",data);
        }
        
      }
      callback( [[NSArray alloc] initWithObjects:message, nil]);
    }];
    
  });
}

// 第三方登录
RCT_EXPORT_METHOD(authLogin:(NSInteger)platform completion:(RCTResponseSenderBlock)completion)
{
  UMSocialPlatformType plf = [self configPlatform: platform];
  if (plf == UMSocialPlatformType_UnKnown) {
    if (completion) {
      completion(@[@(UMSocialPlatformType_UnKnown), @"invalid platform"]);
      return;
    }
  }
  
  [[UMSocialManager defaultManager] getUserInfoWithPlatform:plf currentViewController:nil completion:^(id result, NSError *error) {
    if (completion) {
      if (error) {
        NSString *msg = error.userInfo[@"NSLocalizedFailureReason"];
        if (!msg) {
          msg = error.userInfo[@"message"];
        }if (!msg) {
          msg = @"share failed";
        }
        NSInteger stCode = error.code;
        if(stCode == 2009){
          stCode = -1;
        }
        completion(@[@(stCode), @{}, msg]);
      } else {
        UMSocialUserInfoResponse *authInfo = result;
        
        NSMutableDictionary *retDict = [NSMutableDictionary dictionaryWithCapacity:8];
        retDict[@"uid"] = authInfo.uid;
        retDict[@"openid"] = authInfo.openid;
        retDict[@"unionid"] = authInfo.unionId;
        retDict[@"accessToken"] = authInfo.accessToken;
        retDict[@"refreshToken"] = authInfo.refreshToken;
        retDict[@"expiration"] = authInfo.expiration;
        
        retDict[@"name"] = authInfo.name;
        retDict[@"iconurl"] = authInfo.iconurl;
        retDict[@"gender"] = authInfo.unionGender;
        
        NSDictionary *originInfo = authInfo.originalResponse;
        retDict[@"city"] = originInfo[@"city"];
        retDict[@"province"] = originInfo[@"province"];
        retDict[@"country"] = originInfo[@"country"];
        
        completion(@[@200, retDict, @""]);
      }
    }
  }];
}


@end

