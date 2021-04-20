package com.intootv

import android.app.Activity
import android.net.Uri
import android.os.Bundle
import android.util.Log
import android.view.WindowManager
import android.widget.ProgressBar
import android.view.Window
import com.google.android.exoplayer2.*
import com.google.android.exoplayer2.SimpleExoPlayer
import com.google.android.exoplayer2.source.MediaSource
import com.google.android.exoplayer2.source.TrackGroupArray
import com.google.android.exoplayer2.source.hls.HlsMediaSource
import com.google.android.exoplayer2.trackselection.MappingTrackSelector.MappedTrackInfo
import com.google.android.exoplayer2.trackselection.TrackSelectionArray
import com.google.android.exoplayer2.trackselection.DefaultTrackSelector
import com.google.android.exoplayer2.ui.PlayerView
import com.google.android.exoplayer2.upstream.*
import com.google.android.exoplayer2.util.Util
import com.henninghall.date_picker.DatePickerManager.context
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
    private val streamUrl = "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8";
    private var playerListener: Player.EventListener? = null
    private var bandwidthMeter: BandwidthMeter? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        requestWindowFeature(Window.FEATURE_NO_TITLE) //Remove title bar
        setContentView(R.layout.activity_exo_player)
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN) //Remove notification bar
        if (savedInstanceState == null) {
            val extras = intent.extras
            playWhenReady = true
            currentWindow = 0
            playbackPosition = 0
        } else {
            playWhenReady = savedInstanceState.getBoolean(KEY_PLAY_WHEN_READY)
            currentWindow = savedInstanceState.getInt(KEY_WINDOW)
            playbackPosition = savedInstanceState.getLong(KEY_POSITION)
        }
        shouldAutoPlay = true
        bandwidthMeter = DefaultBandwidthMeter()
        window = Timeline.Window()
        progressBar = findViewById(R.id.progress_bar)
        ThetaDelivery.init(this);
    }

    private fun initializePlayer() {
        if (player == null) {
            player = ExoPlayerFactory.newSimpleInstance(
                    DefaultRenderersFactory(this),
                    DefaultTrackSelector(),
                    DefaultLoadControl()
            )

            playerView?.player = player
            player?.playWhenReady = playWhenReady
            player?.seekTo(0)
            player?.addListener(getPlayerListener())
        }

        val mediaSource = buildMediaSource(Uri.parse(streamUrl))
        player?.prepare(mediaSource, true, false)
    }
    private fun buildMediaSource(uri: Uri): MediaSource {
        val dataSourceFactory = ThetaHlsDataSourceFactory(
                this,
                Util.getUserAgent(this, "DeliverySDK"),
                BANDWIDTH_METER,
                ThetaConfig(
                        streamUrl,
                        "123",
                        "",
                        "vidwmir59zac1566re4"),
                object : ThetaDataSourceListener {
                    override fun onInfoEvent(thetaInfoEvent: ThetaInfoEvent) {
                        Log.d("PlayerActivity", thetaInfoEvent.message)
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
                    }
                }
        )

        return HlsMediaSource.Factory(dataSourceFactory).createMediaSource(uri)
    }
    private fun releasePlayer() {
        if (player != null) {
            playWhenReady = player?.playWhenReady ?: true
            player?.release()
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
        outState.putString("url", streamUrl)
        super.onSaveInstanceState(outState)
    }

    private fun updateStartPosition() {
        playbackPosition = player!!.currentPosition
        currentWindow = player!!.currentWindowIndex
        playWhenReady = player!!.playWhenReady
    }

    override fun onDestroy() {
        ThetaDelivery.destroy(this)
        super.onDestroy()
    }

    private fun getPlayerListener(): Player.EventListener {
        if (playerListener == null) {
            playerListener = object : Player.EventListener {
                override fun onTimelineChanged(timeline: Timeline, manifest: Any, reason: Int) {
                    if (player != null && player?.bufferedPosition ?: 0 <= -2000) {
                        player?.seekToDefaultPosition()
                    }
                }

                override fun onTracksChanged(trackGroups: TrackGroupArray, trackSelections: TrackSelectionArray) {

                }

                override fun onLoadingChanged(isLoading: Boolean) {

                }

                override fun onPlayerStateChanged(playWhenReady: Boolean, playbackState: Int) {

                }

                override fun onRepeatModeChanged(repeatMode: Int) {

                }

                override fun onShuffleModeEnabledChanged(shuffleModeEnabled: Boolean) {

                }

                override fun onPlayerError(error: ExoPlaybackException) {
                    Log.d("OnPlayerError", "message: " + error.message)
                }

                override fun onPositionDiscontinuity(reason: Int) {

                }

                override fun onPlaybackParametersChanged(playbackParameters: PlaybackParameters) {

                }

                override fun onSeekProcessed() {

                }
            }
        }

        return playerListener!!
    }


    companion object {

        private val BANDWIDTH_METER = DefaultBandwidthMeter()
    }
}