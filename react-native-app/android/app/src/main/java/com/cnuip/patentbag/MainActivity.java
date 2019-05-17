package com.cnuip.patentbag;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.cnuip.patentbag.share.ShareModule;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "SpecialSpeakers";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // init umeng share
        ShareModule.initActivity(this);
    }

}
