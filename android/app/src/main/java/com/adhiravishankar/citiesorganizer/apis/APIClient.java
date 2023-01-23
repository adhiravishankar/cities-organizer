package com.adhiravishankar.citiesorganizer.apis;

import com.adhiravishankar.citiesorganizer.environments.Environment;

import okhttp3.OkHttpClient;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class APIClient {
    private static Retrofit retrofit = null;
    public static Retrofit getClient() {

        if (retrofit != null) {
            return retrofit;
        }

        HttpLoggingInterceptor interceptor = new HttpLoggingInterceptor();
        interceptor.setLevel(HttpLoggingInterceptor.Level.BODY);
        OkHttpClient client = new OkHttpClient.Builder().addInterceptor(interceptor).build();

        retrofit = new Retrofit.Builder().baseUrl(Environment.BASE_URL)
                .addConverterFactory(GsonConverterFactory.create()).client(client).build();

        return retrofit;
    }
}