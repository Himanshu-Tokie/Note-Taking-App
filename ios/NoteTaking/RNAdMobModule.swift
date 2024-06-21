//
//  RNAdMobModule.swift
//  NoteTaking
//
//  Created by Chicmic_Reacjs01 on 2024-06-21.
//

import Foundation

import GoogleMobileAds
import React

@objc(RNAdMobModule)
class RNAdMobModule: NSObject, RCTBridgeModule {
  static func moduleName() -> String! {
    return "RNAdMobModule"
  }

  override init() {
    super.init()
  }

  @objc func initializeAds(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
      GADMobileAds.sharedInstance().start(completionHandler: { (status) in
          resolve("AdMob SDK initialized successfully")
      })
  }
}
