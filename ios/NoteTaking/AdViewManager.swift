import Foundation
import GoogleMobileAds

@objc(AdViewManager)
class AdViewManager: RCTViewManager {
  
  override func view() -> UIView! {
    return AdView()
  }
  
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
