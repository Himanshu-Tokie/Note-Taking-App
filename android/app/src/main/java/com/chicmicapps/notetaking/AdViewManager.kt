package com.chicmicapps.notetaking

import android.util.Log
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.google.android.gms.ads.AdRequest
import com.google.android.gms.ads.AdView
import com.google.android.gms.ads.AdSize
import com.google.android.gms.ads.AdListener
import com.google.android.gms.ads.LoadAdError

class AdViewManager : SimpleViewManager<AdView>() {

    companion object {
        const val REACT_CLASS = "BannerAdView"
        const val TAG = "AdViewManager"
    }

    override fun getName(): String {
        return REACT_CLASS
    }

    override fun createViewInstance(reactContext: ThemedReactContext): AdView {
        val adView = AdView(reactContext)
        val adSize = AdSize.getCurrentOrientationInlineAdaptiveBannerAdSize(reactContext, 320)
        adView.setAdSize(adSize)
//        adView.adUnitId = "ca-app-pub-3940256099942544/6300978111"
        val adRequest = AdRequest.Builder().build()
        adView.loadAd(adRequest)
        return adView
    }

    @ReactProp(name = "adUnitId")
    fun setAdUnitId(view: AdView, adUnitId: String) {
        view.adUnitId = adUnitId
        val adRequest = AdRequest.Builder().build()
        view.loadAd(adRequest)
        view.adListener = object : AdListener() {
            override fun onAdLoaded() {
                Log.d(TAG, "Ad loaded successfully")
            }

            override fun onAdFailedToLoad(adError: LoadAdError) {
                Log.d(TAG, "Ad failed to load: ${adError.message}")
            }
        }
    }
}
