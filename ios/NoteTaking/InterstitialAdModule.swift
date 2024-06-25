import Foundation
import GoogleMobileAds

@objc(InterstitialAdModule)
class InterstitialAdModule: NSObject, GADFullScreenContentDelegate {
    
    var interstitial: GADInterstitialAd?
    var adUnitID: String = "ca-app-pub-3940256099942544/4411468910" // Replace with your ad unit ID

    @objc
    func loadInterstitialAd(_ requestID: String) {
        DispatchQueue.main.async {
            let request = GADRequest()
            GADInterstitialAd.load(withAdUnitID: self.adUnitID, request: request) { (ad, error) in
                if let error = error {
                    print("Failed to load interstitial ad with error: \(error.localizedDescription)")
                    return
                }
                self.interstitial = ad
                self.interstitial?.fullScreenContentDelegate = self
                print("Interstitial ad loaded successfully.")
            }
        }
    }

    @objc
    func showInterstitialAd() {
        DispatchQueue.main.async {
            guard let interstitial = self.interstitial else {
                print("Interstitial ad wasn't ready.")
                return
            }
            interstitial.present(fromRootViewController: UIApplication.shared.delegate?.window??.rootViewController)
        }
    }

    // MARK: - GADFullScreenContentDelegate

    func adDidDismissFullScreenContent(_ ad: GADFullScreenPresentingAd) {
        print("Ad did dismiss full screen content.")
    }

    func adWillPresentFullScreenContent(_ ad: GADFullScreenPresentingAd) {
        print("Ad will present full screen content.")
    }

    func ad(_ ad: GADFullScreenPresentingAd, didFailToPresentFullScreenContentWithError error: Error) {
        print("Ad did fail to present full screen content.")
    }
}
