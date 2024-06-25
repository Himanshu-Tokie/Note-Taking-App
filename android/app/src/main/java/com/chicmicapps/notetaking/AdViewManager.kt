package com.chicmicapps.notetaking

import android.util.Log
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.google.android.gms.ads.*
import com.google.android.gms.ads.identifier.AdvertisingIdClient
import java.util.Arrays

class AdViewManager : SimpleViewManager<AdView>() {

    companion object {
        const val REACT_CLASS = "BannerAdView"
        const val TAG = "AdViewManager"
    }

    override fun getName(): String {
        return REACT_CLASS
    }

    override fun createViewInstance(reactContext: ThemedReactContext): AdView {
        MobileAds.initialize(reactContext)
        val adView = AdView(reactContext)
        adView.setAdSize(AdSize.BANNER)
        return adView
    }

    @ReactProp(name = "adUnitId")
    fun setAdUnitId(view: AdView, adUnitId: String) {
        view.adUnitId = adUnitId
//        Log.d(TAG, "AdUnitId set to: $adUnitId")
        // Request test ads
//        val testDeviceIds = listOf("YOUR_DEVICE_HASH")
//        val configuration = RequestConfiguration.Builder().setTestDeviceIds(testDeviceIds).build()
//        MobileAds.setRequestConfiguration(configuration)
        val adInfo = AdvertisingIdClient.getAdvertisingIdInfo(context)
        val deviceId = adInfo.id
        Log.d("DeviceID", "Device ID: $deviceId")
        val adRequest = AdRequest.Builder().build()
        view.adListener = object : AdListener() {
            override fun onAdLoaded() {
                Log.d(TAG, "Ad loaded successfully")
            }

            override fun onAdFailedToLoad(adError: LoadAdError) {
                Log.d(TAG, "Ad failed to load: ${adError.message}")
                // Log device hash for test ads
                Log.d(TAG, "Use RequestConfiguration.Builder().setTestDeviceIds(Arrays.asList(\"YOUR_DEVICE_HASH\")) to get test ads on this device.")
            }
        }

        view.loadAd(adRequest)
    }
}
