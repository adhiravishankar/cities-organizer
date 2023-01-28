package com.adhiravishankar.citiesorganizer.apis;

import com.adhiravishankar.citiesorganizer.models.DetailedNeighborhood;
import com.adhiravishankar.citiesorganizer.models.Neighborhood;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.DELETE;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;

public interface NeighborhoodAPI {

    @GET("neighborhoods")
    Call<List<Neighborhood>> getNeighborhoods();

    @FormUrlEncoded
    @POST("neighborhoods")
    Call<String> postNeighborhood(@Field("name") String name,
                                  @Field("metro_id") String metroID,
                                  @Field("city_id") String cityID,
                                  @Field("link") String link,
                                  @Field("high_school_score") Integer highSchoolScore,
                                  @Field("middle_school_score") Integer middleSchoolScore,
                                  @Field("elementary_school_score") Integer elementarySchoolScore,
                                  @Field("address") String address,
                                  @Field("notes") Integer minimumValue,
                                  @Field("notes") Integer maximumValue,
                                  @Field("notes") Integer minSqft,
                                  @Field("notes") Integer maxSqft,
                                  @Field("notes") String notes,
                                  @Field("featured_image") String featuredImage);

    @GET("neighborhoods/{neighborhood}")
    Call<DetailedNeighborhood> getNeighborhood(@Path("neighborhood") String neighborhood);

    @FormUrlEncoded
    @PUT("neighborhoods/{neighborhood}")
    Call<String> updateNeighborhood(@Path("neighborhood") String neighborhood,
                                    @Field("name") String name,
                                    @Field("metro_id") String metroID,
                                    @Field("city_id") String cityID,
                                    @Field("link") String link,
                                    @Field("high_school_score") Integer highSchoolScore,
                                    @Field("middle_school_score") Integer middleSchoolScore,
                                    @Field("elementary_school_score") Integer elementarySchoolScore,
                                    @Field("address") String address,
                                    @Field("notes") Integer minimumValue,
                                    @Field("notes") Integer maximumValue,
                                    @Field("notes") Integer minSqft,
                                    @Field("notes") Integer maxSqft,
                                    @Field("notes") String notes,
                                    @Field("featured_image") String featuredImage);

    @DELETE("neighborhoods/{neighborhood}")
    Call<String> deleteNeighborhood(@Path("neighborhood") String neighborhood);
}
