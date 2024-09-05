import Foundation
import GoogleMobileAds

@objc(AdView)
class AdView: UIView {
  
  var bannerView: GADBannerView!
  
  override init(frame: CGRect) {
    super.init(frame: frame)
  }
  
  required init?(coder: NSCoder) {
    super.init(coder: coder)
  }
  
  @objc func loadBanner(adUnitId: String) {
    bannerView = GADBannerView(adSize: GADAdSizeFromCGSize(CGSize(width: self.frame.size.width, height: 50)))
    bannerView.adUnitID = adUnitId
    bannerView.rootViewController = UIApplication.shared.delegate?.window??.rootViewController
    bannerView.load(GADRequest())
    bannerView.translatesAutoresizingMaskIntoConstraints = false
    self.addSubview(bannerView)
    
    NSLayoutConstraint.activate([
      bannerView.centerXAnchor.constraint(equalTo: self.centerXAnchor),
      bannerView.bottomAnchor.constraint(equalTo: self.bottomAnchor),
      bannerView.widthAnchor.constraint(equalTo: self.widthAnchor),
      bannerView.heightAnchor.constraint(equalToConstant: 50)
    ])
  }
}
