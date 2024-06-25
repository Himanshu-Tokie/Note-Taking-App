package com.chicmicapps.notetaking

import android.util.DisplayMetrics
import android.util.Log
import android.view.WindowManager
import com.facebook.react.bridge.*
import com.google.android.gms.ads.*
import java.util.Arrays

class AdViewModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    companion object {
        private const val REACT_CLASS = "AdView"
    }

    override fun getName(): String {
        return REACT_CLASS
    }

    @ReactMethod
    fun loadBanner(adUnitId: String, promise: Promise) {
        val activity = currentActivity ?: return promise.reject("Activity not found")
        val testDeviceIds = Arrays.asList("B3EEABB8EE11C2BE770B684D95219ECB")
        val configuration = RequestConfiguration.Builder().setTestDeviceIds(testDeviceIds).build()
        MobileAds.setRequestConfiguration(configuration)
        activity.runOnUiThread {
            val adSize = calculateAdSize()
            val adView = AdView(activity)
            adView.setAdSize(adSize)
            adView.adUnitId = adUnitId
            val adRequest = AdRequest.Builder().build()
            adView.loadAd(adRequest)
            Log.d(REACT_CLASS, "Test Device ID: ${AdRequest.DEVICE_ID_EMULATOR}")
            adView.adListener = object : AdListener() {
                override fun onAdLoaded() {
                    promise.resolve("Ad loaded successfully")
                }

                override fun onAdFailedToLoad(error: LoadAdError) {
                    val errorCode = error.message ?: "Unknown error"
                    promise.reject("Ad failed to load", errorCode)
                }
            }
        }
    }

    private fun calculateAdSize(): AdSize {
        val windowManager = reactContext.getSystemService(WindowManager::class.java)
        val display = windowManager.defaultDisplay
        val outMetrics = DisplayMetrics()
        display.getMetrics(outMetrics)

        val density = outMetrics.density

        val adWidthPixels = outMetrics.widthPixels.toFloat()
        val adWidth = (adWidthPixels / density).toInt()
        return AdSize.getCurrentOrientationAnchoredAdaptiveBannerAdSize(reactContext, adWidth)
    }
}


