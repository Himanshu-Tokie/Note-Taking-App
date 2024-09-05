package com.chicmicapps.notetaking

import android.app.Activity
import android.util.Log
import com.facebook.react.bridge.*
import com.google.android.gms.ads.AdRequest
import com.google.android.gms.ads.LoadAdError
import com.google.android.gms.ads.MobileAds
import com.google.android.gms.ads.interstitial.InterstitialAd
import com.google.android.gms.ads.interstitial.InterstitialAdLoadCallback

class AdInterstitialModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    companion object {
        private const val REACT_CLASS = "AdInterstitialModule"
        private const val TAG = "AdInterstitialModule"
    }

    override fun getName(): String {
        return REACT_CLASS
    }

    @ReactMethod
    fun loadInterstitialAd(adUnitId: String, promise: Promise) {
        val activity = currentActivity ?: return promise.reject("Activity not found")

        MobileAds.initialize(reactContext) {}

        val adRequest = AdRequest.Builder().build()

        activity.runOnUiThread {
            InterstitialAd.load(
                reactContext,
                adUnitId,
                adRequest,
                object : InterstitialAdLoadCallback() {
                    override fun onAdFailedToLoad(adError: LoadAdError) {
                        Log.d(TAG, "Ad failed to load: ${adError.message}")
                        promise.reject("Ad failed to load", adError.message)
                    }

                    override fun onAdLoaded(interstitialAd: InterstitialAd) {
                        Log.d(TAG, "Ad loaded successfully.")
                        promise.resolve("Ad loaded successfully.")
                    }
                })
        }
    }
}
