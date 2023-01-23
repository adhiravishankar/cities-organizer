package com.adhiravishankar.citiesorganizer.activities;

import android.os.Bundle;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.adhiravishankar.citiesorganizer.R;
import com.adhiravishankar.citiesorganizer.adapters.MetrosListAdapter;
import com.adhiravishankar.citiesorganizer.apis.APIClient;
import com.adhiravishankar.citiesorganizer.apis.MetroAPI;
import com.adhiravishankar.citiesorganizer.databinding.MetrosListBinding;
import com.adhiravishankar.citiesorganizer.models.Metro;
import com.google.android.material.snackbar.Snackbar;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MetrosList extends AppCompatActivity implements Callback<List<Metro>> {

    MetrosListAdapter metrosListAdapter;

    MetrosListBinding binding;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        binding = MetrosListBinding.inflate(getLayoutInflater());
        View view = binding.getRoot();
        setContentView(view);

        LinearLayoutManager linearLayoutManager = new LinearLayoutManager(this);
        RecyclerView recyclerView = binding.metrosListRecyclerView;
        recyclerView.setLayoutManager(linearLayoutManager);
        metrosListAdapter = new MetrosListAdapter();
        recyclerView.setAdapter(metrosListAdapter);


        MetroAPI metroAPI = APIClient.getClient().create(MetroAPI.class);
        Call<List<Metro>> metrosListCall = metroAPI.getMetros();

        metrosListCall.enqueue(this);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.metros_app_bar, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        int itemId = item.getItemId();
        if (itemId == R.id.edit_icon) {
            int editFailure = R.string.snackbar_edit_failure;
            Snackbar.make(binding.getRoot(), editFailure, Snackbar.LENGTH_SHORT).show();
            return true;
        } else if (itemId == R.id.add_icon) {
            return true;
        }
        return super.onOptionsItemSelected(item);
    }

    @Override
    public void onResponse(@NonNull Call<List<Metro>> call, Response<List<Metro>> response) {
        List<Metro> metros = response.body();
        metrosListAdapter.submitList(metros);
    }

    @Override
    public void onFailure(Call<List<Metro>> call, Throwable t) {

    }
}
