//
//  AlipayManager.h
//  SpecialSpeakers
//
//  Created by MudOnTire on 2019/2/20.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

//支付成功Block的定义
typedef void(^PaySuccess)( NSDictionary* resultDic, NSString* message);
typedef void(^PayFailure)(NSDictionary* resultDic, NSString* message);

@interface AlipayManager : NSObject

@property (nonatomic,copy)PayFailure payFailure;
@property (nonatomic,copy)PaySuccess paySuccess;
+ (instancetype)sharedManager;
-(void)dealWithAliPayCallBackUrl:(NSURL *)url;

@end

NS_ASSUME_NONNULL_END
