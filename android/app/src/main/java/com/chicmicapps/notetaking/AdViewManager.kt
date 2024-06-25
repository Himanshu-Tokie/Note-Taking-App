package com.chicmicapps.notetaking

import android.util.Log
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.google.android.gms.ads.*
import com.google.android.gms.ads.identifier.AdvertisingIdClient
import java.util.Arrays
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

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
        CoroutineScope(Dispatchers.IO).launch {
            try {
                val adInfo = AdvertisingIdClient.getAdvertisingIdInfo(view.context)
                val deviceId = adInfo.id
                Log.d(TAG, "Device ID: $deviceId")
                val testDeviceIds = listOf(deviceId)
                val configuration = RequestConfiguration.Builder().setTestDeviceIds(testDeviceIds).build()
                MobileAds.setRequestConfiguration(configuration)
                withContext(Dispatchers.Main) {
                    val adRequest = AdRequest.Builder().build()
                    view.adListener = object : AdListener() {
                        override fun onAdLoaded() {
                            Log.d(TAG, "Ad loaded successfully")
                        }

                        override fun onAdFailedToLoad(adError: LoadAdError) {
                            Log.d(TAG, "Ad failed to load: ${adError.message}")
                        }
                    }
                    view.loadAd(adRequest)
                }
            } catch (e: Exception) {
                Log.e(TAG, "Failed to get device ID", e)
            }
        }
    }
}
