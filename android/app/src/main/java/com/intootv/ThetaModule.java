package com.intootv;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.provider.MediaStore;
import android.util.Log;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class ThetaModule extends ReactContextBaseJavaModule implements ActivityEventListener,VideoClassListener.VideoListener{
    public final int VIDEO_CODE = 1;
    Promise videoPromise;

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

    @ReactMethod
    public void showVideoPlayer(String url,final Promise promise) {
        Activity currentActivity = getCurrentActivity();
        if (currentActivity != null) {
            VideoClassListener.getInstance().setListener(this);
            VideoClassListener.getInstance().videoState(false);
//            promise.resolve("videoEndreach");

            videoPromise = promise;
//            Intent videoIntent = new Intent(Intent.ACTION_VIEW);
//            videoIntent.setDataAndType(Uri.parse(url), "video/*");
//            currentActivity.startActivityForResult(videoIntent, VIDEO_CODE);
            Intent videoIntent = new Intent(getCurrentActivity(),ExoPlayer.class);
            videoIntent.putExtra("url",url);
            // videoIntent.setDataAndType(Uri.parse(url), "video/*");
            currentActivity.startActivityForResult(videoIntent, VIDEO_CODE);
        }else{
            promise.reject("ACTIVITY_NOT_FOUND", "Activity doesn't exist");
            return;
        }
    }

    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {

        Log.e("requestCode",requestCode+"");
        if (requestCode == VIDEO_CODE) {
            getCurrentActivity().finish();
        }
    }

    @Override
    public void onNewIntent(Intent intent) {

    }

    @Override
    public void videoEndReach() {

        if(videoPromise!=null && VideoClassListener.getInstance().getVideoState() == true){
            Log.e("videoEndReach","callback called : "+VideoClassListener.getInstance().getVideoState());
            videoPromise.resolve("videoEndreach");
            videoPromise = null;
        }
    }
}