//
//  CombinedModule.m
//  NoteTaking
//
//  Created by Chicmic_Reacjs01 on 2024-06-21.
//

#import <Foundation/Foundation.h>

#import <React/RCTBridgeModule.h>
// This ensures the module is exported to React Native
@interface RCT_EXTERN_REMAP_MODULE(AdsModule,RNAdMobModule, NSObject)
RCT_EXTERN_METHOD(initializeAds: (RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
@end

//#import "React/RCTBridgeModule.h"
@interface RCT_EXTERN_MODULE(Counter, NSObject)
@end
