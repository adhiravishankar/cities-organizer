package com.adhiravishankar.citiesorganizer

import android.app.Application
import android.content.Context
import com.facebook.drawee.backends.pipeline.Fresco
import com.facebook.imagepipeline.backends.okhttp3.OkHttpImagePipelineConfigFactory
import com.facebook.imagepipeline.core.ImagePipelineConfig
import okhttp3.OkHttpClient

class Application: Application() {

    override fun onCreate() {
        super.onCreate()

        val context: Context = this.applicationContext
        val okHttpClient = OkHttpClient()
        val config: ImagePipelineConfig = OkHttpImagePipelineConfigFactory
            .newBuilder(context, okHttpClient).build()
        Fresco.initialize(this, config)
    }

}