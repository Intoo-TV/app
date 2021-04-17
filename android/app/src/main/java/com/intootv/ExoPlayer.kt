package com.intootv

import android.app.Activity
import android.net.Uri
import android.os.Bundle
import android.util.Log
import android.view.View
import android.view.Window
import android.view.WindowManager
import android.widget.ProgressBar
import android.widget.Toast
import com.google.android.exoplayer2.*
import com.google.android.exoplayer2.source.MediaSource
import com.google.android.exoplayer2.source.TrackGroupArray
import com.google.android.exoplayer2.source.hls.HlsMediaSource
import com.google.android.exoplayer2.trackselection.DefaultTrackSelector
import com.google.android.exoplayer2.trackselection.MappingTrackSelector.MappedTrackInfo
import com.google.android.exoplayer2.trackselection.TrackSelectionArray
import com.google.android.exoplayer2.ui.PlayerView
import com.google.android.exoplayer2.upstream.*
import com.google.android.exoplayer2.util.Util
import org.theta.deliverysdk.ThetaDelivery
import org.theta.deliverysdk.datasource.ThetaDataSourceListener
import org.theta.deliverysdk.datasource.ThetaHlsDataSourceFactory
import org.theta.deliverysdk.models.*

private const val KEY_PLAY_WHEN_READY = "play_when_ready"
private const val KEY_WINDOW = "window"
private const val KEY_POSITION = "position"

class ExoPlayer : Activity() {

    private var playerView: PlayerView? = null
    private var player: SimpleExoPlayer? = null
    private var window: Timeline.Window? = null
    private var trackSelector: DefaultTrackSelector? = null
    private var lastSeenTrackGroupArray: TrackGroupArray? = null
    private var shouldAutoPlay = false
    private var progressBar: ProgressBar? = null
    private var playWhenReady = false
    private var currentWindow = 0
    private var playbackPosition: Long = 0
    private var url: String? = null
    private val streamUrl = "[your_m3u8_url]"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        requestWindowFeature(Window.FEATURE_NO_TITLE) //Remove title bar
        setContentView(R.layout.activity_exo_player)
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN) //Remove notification bar
        if (savedInstanceState == null) {
            val extras = intent.extras
            url = extras?.getString("url")
            playWhenReady = true
            currentWindow = 0
            playbackPosition = 0
        } else {
            playWhenReady = savedInstanceState.getBoolean(KEY_PLAY_WHEN_READY)
            currentWindow = savedInstanceState.getInt(KEY_WINDOW)
            playbackPosition = savedInstanceState.getLong(KEY_POSITION)
            url = savedInstanceState.getString("url")
        }
        shouldAutoPlay = true
        window = Timeline.Window()
        progressBar = findViewById(R.id.progress_bar)
        ThetaDelivery.init(this)
    }

    private fun initializePlayer() {
        playerView = findViewById(R.id.player_view)
        playerView?.requestFocus()
        trackSelector = DefaultTrackSelector(applicationContext)
        lastSeenTrackGroupArray = null
        player = SimpleExoPlayer.Builder(applicationContext)
                .setTrackSelector(trackSelector!!)
                .build()
        playerView?.player = player
        player?.addListener(PlayerEventListener())
        player?.playWhenReady = shouldAutoPlay

        val haveStartPosition = currentWindow != C.INDEX_UNSET
        if (haveStartPosition) {
            player?.seekTo(currentWindow, playbackPosition)
        }
        val mediaSource = buildMediaSource(Uri.parse(streamUrl))
        player?.prepare(mediaSource, !haveStartPosition, false)
        updateButtonVisibilities()

    }

    private fun buildMediaSource(uri: Uri): MediaSource {
        val dataSourceFactory = ThetaHlsDataSourceFactory(
                this,
                Util.getUserAgent(this, "DeliverySDK"),
                DefaultBandwidthMeter.Builder(applicationContext).build(),
                ThetaConfig(
                        streamUrl,
                        "[unique_user_id]"),
                object : ThetaDataSourceListener {
                    override fun onInfoEvent(thetaInfoEvent: ThetaInfoEvent) {
                        Log.d("PlayerActivity", thetaInfoEvent.message)
                        runOnUiThread {  }
                    }

                    override fun onTrafficEvent(trafficEvent: ThetaTrafficEvent) {
                        runOnUiThread {
                        }

                    }

                    override fun onPeersChangedEvent(peersEvent: ThetaPeersChangedEvent) {
                        runOnUiThread {
                        }

                    }

                    override fun onAccountUpdatedEvent(userWalletEvent: ThetaUserWalletEvent) {

                    }

                    override fun onErrorEvent(errorEvent: ThetaErrorEvent) {
                        runOnUiThread { }
                    }
                }
        )

        return HlsMediaSource.Factory(dataSourceFactory).createMediaSource(uri)
    }

    private fun releasePlayer() {
        if (player != null) {
            updateStartPosition()
            shouldAutoPlay = player!!.playWhenReady
            player!!.release()
            player = null
        }
    }

    public override fun onStart() {
        super.onStart()
        initializePlayer()
    }

    public override fun onResume() {
        super.onResume()
        if (player == null) {
            initializePlayer()
        }
    }

    public override fun onPause() {
        super.onPause()
        releasePlayer()
    }

    override fun onSaveInstanceState(outState: Bundle) {
        updateStartPosition()
        outState.putBoolean(KEY_PLAY_WHEN_READY, playWhenReady)
        outState.putInt(KEY_WINDOW, currentWindow)
        outState.putLong(KEY_POSITION, playbackPosition)
        outState.putString("url", url)
        super.onSaveInstanceState(outState)
    }

    private fun updateStartPosition() {
        playbackPosition = player!!.currentPosition
        currentWindow = player!!.currentWindowIndex
        playWhenReady = player!!.playWhenReady
    }

    private fun updateButtonVisibilities() {
//        if (player == null) {
//            return
//        }
//        val mappedTrackInfo = trackSelector!!.currentMappedTrackInfo ?: return
//        for (i in 0 .. mappedTrackInfo.rendererCount) {
//            val trackGroups = mappedTrackInfo.getTrackGroups(i)
//            if (trackGroups.length != 0) {
//                if (player!!.getRendererType(i) == C.TRACK_TYPE_VIDEO) {
//                }
//            }
//        }
    }

    override fun onDestroy() {
        ThetaDelivery.destroy(this)
        super.onDestroy()
    }

    private inner class PlayerEventListener : Player.EventListener {
        override fun onPlayerStateChanged(playWhenReady: Boolean, playbackState: Int) {
            when (playbackState) {
                Player.STATE_IDLE -> progressBar!!.visibility = View.VISIBLE
                Player.STATE_BUFFERING -> progressBar!!.visibility = View.VISIBLE
                Player.STATE_READY -> progressBar!!.visibility = View.GONE
                Player.STATE_ENDED -> {
                    Log.e("video finished", "finish")
                    VideoClassListener.getInstance().videoState(true)
                    progressBar!!.visibility = View.GONE
                }
            }
            updateButtonVisibilities()
        }

        override fun onTracksChanged(trackGroups: TrackGroupArray, trackSelections: TrackSelectionArray) {
            updateButtonVisibilities()
            // The video tracks are no supported in this device.
            if (trackGroups !== lastSeenTrackGroupArray) {
                val mappedTrackInfo = trackSelector?.currentMappedTrackInfo
                if (mappedTrackInfo != null) {
                    if (mappedTrackInfo.getTypeSupport(C.TRACK_TYPE_VIDEO)
                            == MappedTrackInfo.RENDERER_SUPPORT_UNSUPPORTED_TRACKS) {
                        Toast.makeText(this@ExoPlayer, "Error unsupported track", Toast.LENGTH_SHORT).show()
                    }
                }
                lastSeenTrackGroupArray = trackGroups
            }
        }
    }
}