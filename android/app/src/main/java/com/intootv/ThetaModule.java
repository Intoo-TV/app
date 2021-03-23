package com.intootv;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;
import android.util.Log;

public class ThetaModule extends ReactContextBaseJavaModule {
    ThetaModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "ThetaModule";
    }

    @ReactMethod
    public void test() {
        Log.d("ThetaModule", "Test whether the code can be reached from react native");
    }
}