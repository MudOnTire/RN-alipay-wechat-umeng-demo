//
//  AlipayManager.m
//  SpecialSpeakers
//
//  Created by MudOnTire on 2019/2/20.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "AlipayManager.h"
#import <AlipaySDK/AlipaySDK.h>
@implementation AlipayManager

+(instancetype)sharedManager {
  static dispatch_once_t onceToken;
  static AlipayManager *instance;
  dispatch_once(&onceToken, ^{
    instance = [[AlipayManager alloc] init];
  });
  return instance;
}

-(void)dealWithAliPayCallBackUrl:(NSURL *)url{
  [[AlipaySDK defaultService] processOrderWithPaymentResult:url standbyCallback:^(NSDictionary *resultDic) {
    NSLog(@"result = %@",resultDic);
    //支付回调
    NSString *resultStatus = [resultDic objectForKey:@"resultStatus"];
    if ([resultStatus isEqualToString:@"9000"]){ //订单支付成功
      self.paySuccess(resultDic,@"支付成功");
    }else if([resultStatus isEqualToString:@"6002"]){//网络错误
      self.payFailure(resultDic,@"网络错误");
    }else if([resultStatus isEqualToString:@"6001"]){//中途取消
      self.payFailure(resultDic,@"支付取消");
    }else{//处理失败
      self.payFailure(resultDic,@"支付失败");
    }
  }];
}
@end
