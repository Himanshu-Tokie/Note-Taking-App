package com.chicmicapps.notetaking

import android.app.Activity
import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.google.android.gms.ads.AdRequest
import com.google.android.gms.ads.LoadAdError
import com.google.android.gms.ads.interstitial.InterstitialAd
import com.google.android.gms.ads.interstitial.InterstitialAdLoadCallback
import com.google.android.gms.ads.MobileAds
import android.os.Handler
import android.os.Looper

class InterstitialAdModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private var mInterstitialAd: InterstitialAd? = null
    private val TAG = "InterstitialAdModule"

    override fun getName(): String {
        return "InterstitialAdModule"
    }

    @ReactMethod
    fun initializeAds() {
        MobileAds.initialize(reactApplicationContext) { initializationStatus ->
            val statusMap = initializationStatus.adapterStatusMap
            for (adapterClass in statusMap.keys) {
                val status = statusMap[adapterClass]
                Log.d(
                    "MyApp", String.format(
                        "Adapter name: %s, Description: %s, Latency: %d",
                        adapterClass, status!!.description, status.latency
                    )
                )
            }
        }
    }

    @ReactMethod
    fun loadInterstitialAd(adUnitId: String) {
        Handler(Looper.getMainLooper()).post {
            val adRequest = AdRequest.Builder().build()

            InterstitialAd.load(reactApplicationContext, adUnitId, adRequest, object : InterstitialAdLoadCallback() {
                override fun onAdFailedToLoad(adError: LoadAdError) {
                    Log.d(TAG, adError.toString())
                    mInterstitialAd = null
                }

                override fun onAdLoaded(interstitialAd: InterstitialAd) {
                    Log.d(TAG, "Ad was loaded.")
                    mInterstitialAd = interstitialAd
                }
            })
        }
    }

    @ReactMethod
    fun showInterstitialAd() {
        val activity = currentActivity
        if (activity != null) {
            activity.runOnUiThread {
                if (mInterstitialAd != null) {
                    mInterstitialAd?.show(activity)
                } else {
                    Log.d(TAG, "The interstitial ad wasn't ready yet.")
                }
            }
        } else {
            Log.d(TAG, "Current activity is null.")
        }
    }
}
