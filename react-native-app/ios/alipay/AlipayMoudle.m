#import "AlipayMoudle.h"
#import <AlipaySDK/AlipaySDK.h>
#import "AlipayManager.h"

@implementation AlipayMoudle

RCT_EXPORT_METHOD(pay:(NSString *)orderInfo
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject){
  // NOTE:未安装支付宝客户端走下面方法，安装了不会走
  if (orderInfo != nil){
    NSString *appScheme = @"alipaywepaydemo"; //配置调回app的唯一标识，见支付宝文档
    [[AlipaySDK defaultService] payOrder:orderInfo fromScheme:appScheme callback:^(NSDictionary *resultDic) {
      //支付回调
      NSString *resultStatus = [resultDic objectForKey:@"resultStatus"];
      if ([resultStatus isEqualToString:@"9000"]){ //订单支付成功
        resolve(resultDic);
      }else if([resultStatus isEqualToString:@"6002"]){//网络错误
        reject(resultStatus,@"网络错误",nil);
      }else if([resultStatus isEqualToString:@"6001"]){//中途取消
        reject(resultStatus,@"取消支付",nil);
      }else{//处理失败
        reject(resultStatus,@"支付失败",nil);
      }
    }];
  }
  //NOTE:已安装支付宝客户端走appdelegate回调
  [[AlipayManager sharedManager] setPaySuccess:^(NSDictionary *resultDic, NSString *message) {
    resolve(resultDic);
  }];
  [[AlipayManager sharedManager] setPayFailure:^(NSDictionary *resultDic, NSString *message) {
    reject(@"", message, nil);
  }];
}

RCT_EXPORT_MODULE(Alipay);

@end

