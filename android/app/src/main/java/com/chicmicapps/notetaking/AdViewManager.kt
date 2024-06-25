package com.chicmicapps.notetaking

import android.util.Log
import android.view.View
import android.view.ViewGroup
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.google.android.gms.ads.*
import com.google.android.gms.ads.identifier.AdvertisingIdClient
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
        Log.d(TAG, "create view called")
        MobileAds.initialize(reactContext)
        val adView = AdView(reactContext)
        adView.setAdSize(AdSize.BANNER)
        adView.layoutParams = ViewGroup.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT,
            ViewGroup.LayoutParams.WRAP_CONTENT
        )
        return adView
    }

    @ReactProp(name = "adUnitId")
    fun setAdUnitId(view: AdView, adUnitId: String) {
        Log.d(TAG, "Setting adUnitId: $adUnitId")
        view.adUnitId = adUnitId
        view.visibility = View.GONE

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
                    Log.d(TAG, "Loading ad with request: $adRequest")
                    view.adListener = object : AdListener() {
                        override fun onAdLoaded() {
                            Log.d(TAG, "Ad loaded successfully")
                            view.visibility = View.VISIBLE
                        }

                        override fun onAdFailedToLoad(adError: LoadAdError) {
                            Log.d(TAG, "Ad failed to load: ${adError.message}")
                            view.visibility = View.GONE
                        }

                        override fun onAdOpened() {
                            Log.d(TAG, "Ad opened")
                        }

                        override fun onAdClicked() {
                            Log.d(TAG, "Ad clicked")
                        }

                        override fun onAdClosed() {
                            Log.d(TAG, "Ad closed")
                        }

                        override fun onAdImpression() {
                            Log.d(TAG, "Ad impression")
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
