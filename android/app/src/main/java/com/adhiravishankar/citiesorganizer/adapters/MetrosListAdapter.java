package com.adhiravishankar.citiesorganizer.adapters;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.ListAdapter;

import com.adhiravishankar.citiesorganizer.activities.MetroDetails;
import com.adhiravishankar.citiesorganizer.databinding.MetroCardBinding;
import com.adhiravishankar.citiesorganizer.modeldiffs.MetroDiff;
import com.adhiravishankar.citiesorganizer.models.Metro;
import com.adhiravishankar.citiesorganizer.views.MetrosListRecyclerViewHolder;

public class MetrosListAdapter extends ListAdapter<Metro, MetrosListRecyclerViewHolder> {

    /**
     * Initialize the dataset of the Adapter
     */
    public MetrosListAdapter() {
        super(new MetroDiff());
    }

    // Create new views (invoked by the layout manager)
    @NonNull
    @Override
    public MetrosListRecyclerViewHolder onCreateViewHolder(ViewGroup viewGroup, int viewType) {
        // Create a new view, which defines the UI of the list item
        MetroCardBinding metroCardBinding = MetroCardBinding
                .inflate(LayoutInflater.from(viewGroup.getContext()));

        return new MetrosListRecyclerViewHolder(metroCardBinding);
    }

    // Replace the contents of a view (invoked by the layout manager)
    @Override
    public void onBindViewHolder(MetrosListRecyclerViewHolder viewHolder, final int position) {
        // Get element from your dataset at this position and replace the
        // contents of the view with that element
        viewHolder.getTextView().setText(this.getItem(position).getName());
        String uuid = this.getItem(position).getID();
        String metroName = this.getItem(position).getName();
        Context context = viewHolder.itemView.getContext();
        viewHolder.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(context, MetroDetails.class);
                intent.putExtra("id", uuid);
                intent.putExtra("name", metroName);
                viewHolder.itemView.getContext().startActivity(intent);
            }
        });
    }
}
