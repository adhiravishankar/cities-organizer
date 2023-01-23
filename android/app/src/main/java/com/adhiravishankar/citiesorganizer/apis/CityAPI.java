package com.adhiravishankar.citiesorganizer.apis;

import com.adhiravishankar.citiesorganizer.models.DetailedCity;
import com.adhiravishankar.citiesorganizer.models.City;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.DELETE;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;

public interface CityAPI {

    @GET("cities")
    Call<List<City>> getCities();

    @FormUrlEncoded
    @POST("cities")
    Call<String> postCity(@Field("name") String name,
                           @Field("metro_id") String metroID,
                           @Field("population") Integer population,
                           @Field("notes") String notes,
                           @Field("featured_image") String featuredImage);

    @GET("cities/{city}")
    Call<DetailedCity> getCity(@Path("city") String city);

    @FormUrlEncoded
    @PUT("cities/{city}")
    Call<String> updateCity(@Path("city") String city,
                             @Field("name") String name,
                             @Field("population") Integer population,
                             @Field("notes") String notes,
                             @Field("featured_image") String featuredImage);

    @DELETE("cities/{city}")
    Call<String> deleteCity(@Path("city") String city);
}
