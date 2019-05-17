package com.cnuip.patentbag;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.dooboolab.RNIap.RNIapPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.imagepicker.ImagePickerPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.corbt.keepawake.KCKeepAwakePackage;
import com.brentvatne.react.ReactVideoPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.cnuip.patentbag.alipay.AlipayPackage;
import com.cnuip.patentbag.share.SharePackage;
import com.theweflex.react.WeChatPackage;
import com.umeng.commonsdk.UMConfigure;
import com.umeng.socialize.Config;
import com.umeng.socialize.PlatformConfig;
import com.umeng.socialize.UMShareAPI;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new RNIapPackage(),
                    new FastImageViewPackage(),
                    new ImagePickerPackage(),
                    new RNCWebViewPackage(),
                    new LinearGradientPackage(),
                    new OrientationPackage(),
                    new KCKeepAwakePackage(),
                    new ReactVideoPackage(),
                    new VectorIconsPackage(),
                    new AlipayPackage(),
                    new WeChatPackage(),
                    new SharePackage()
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
        //初始化umeng
        UMConfigure.init(this, "59f17a87a40fa34c9d00000c", "", UMConfigure.DEVICE_TYPE_PHONE, "6b4f70d9156b4ed2f5be6ed3f6bd5b37");

        //umeng share
        Config.shareType = "react native";
        UMShareAPI.get(this);
        {
            PlatformConfig.setWeixin("wx63f0e9b11b8cc14d", "98c5cc82e9660ae22652793e873dcf57");
            PlatformConfig.setQQZone("101529180", "666d46594563c5f0fcc4577cc8ed6250");
//            PlatformConfig.setSinaWeibo("2733400964","fac50980a44e3e3afd4bc968ea572887","www.baidu.com");
        }
    }
}
