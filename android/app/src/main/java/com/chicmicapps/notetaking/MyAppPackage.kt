package com.chicmicapps.notetaking

import android.view.View
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class MyAppPackage : ReactPackage {

    override fun createViewManagers(reactContext: ReactApplicationContext)=
        listOf(
            AdViewManager()
        )


    override fun createNativeModules(
        reactContext: ReactApplicationContext
    ): List<NativeModule> {
        return listOf(
            CalendarModule(reactContext),
            AdsModule(reactContext),
//            AdViewModule(reactContext),
//            AdInterstitialModule(reactContext)
        )
    }
}
