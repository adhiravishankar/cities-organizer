package com.adhiravishankar.citiesorganizer.activities;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.adhiravishankar.citiesorganizer.apis.APIClient;
import com.adhiravishankar.citiesorganizer.apis.MetroAPI;
import com.adhiravishankar.citiesorganizer.databinding.MetroDetailsBinding;
import com.adhiravishankar.citiesorganizer.models.DetailedMetro;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MetroDetails extends AppCompatActivity implements Callback<DetailedMetro> {

    MetroDetailsBinding binding;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        binding = MetroDetailsBinding.inflate(getLayoutInflater());
        View view = binding.getRoot();
        setContentView(view);

        Intent intent = getIntent();
        String uuid = intent.getStringExtra("id");
        String name = intent.getStringExtra("name");

        binding.topAppBar.setTitle(name);

        MetroAPI metroAPI = APIClient.getClient().create(MetroAPI.class);
        Call<DetailedMetro> metro = metroAPI.getMetro(uuid);
        metro.enqueue(this);
    }

    @Override
    public void onResponse(Call<DetailedMetro> call, Response<DetailedMetro> response) {
        DetailedMetro detailedMetro = response.body();
    }

    @Override
    public void onFailure(Call<DetailedMetro> call, Throwable t) {

    }
}
