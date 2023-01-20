package com.adhiravishankar.citiesorganizer.apis;

import com.adhiravishankar.citiesorganizer.models.DetailedMetro;
import com.adhiravishankar.citiesorganizer.models.Metro;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.DELETE;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;

public interface MetroAPI {

    @GET("metros")
    Call<List<Metro>> getMetros();

    @FormUrlEncoded
    @POST("metros")
    Call<String> postMetro(@Field("name") String name,
                           @Field("extended_name") String extendedName,
                           @Field("small_name") String smallName,
                           @Field("population") Integer population,
                           @Field("metro_size_rank") Integer metroSizeRank,
                           @Field("notes") String notes,
                           @Field("featured_image") String featuredImage);

    @GET("metros/{metro}")
    Call<DetailedMetro> getMetro(@Path("metro") String metro);

    @FormUrlEncoded
    @PUT("metros/{metro}")
    Call<String> updateMetro(@Path("metro") String metro,
                             @Field("name") String name,
                             @Field("extended_name") String extendedName,
                             @Field("small_name") String smallName,
                             @Field("population") Integer population,
                             @Field("metro_size_rank") Integer metroSizeRank,
                             @Field("notes") String notes,
                             @Field("featured_image") String featuredImage);

    @DELETE("metros/{metro}")
    Call<String> deleteMetro(@Path("metro") String metro);
}
