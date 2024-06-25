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
  static func requiresMainQueueSetup() -> Bool {
    return true
  }

  static func moduleName() -> String! {
    return "RNAdMobModule"
  }

  override init() {
    super.init()
  }

  @objc func initializeAds(_ resolve: @escaping RCTPromiseResolveBlock,
                           rejecter reject: @escaping RCTPromiseRejectBlock) {
      GADMobileAds.sharedInstance().start { (status) in
          if status.adapterStatusesByClassName.isEmpty {
            print("AdMob SDK initialization failed")
              reject("E_ADS_INIT_FAILED", "AdMob SDK initialization failed", nil)
          } else {
            print("AdMob SDK initialized successfully")
              resolve("AdMob SDK initialized successfully")
          }
      }
  }
}

