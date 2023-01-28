package com.adhiravishankar.citiesorganizer.views;

import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import com.adhiravishankar.citiesorganizer.databinding.MetroCardBinding;

/**
 * Provide a reference to the type of views that you are using
 * (custom ViewHolder)
 */
public class MetrosListRecyclerViewHolder extends RecyclerView.ViewHolder {

    private final TextView textView;

    public MetrosListRecyclerViewHolder(MetroCardBinding metroCardBinding) {
        super(metroCardBinding.getRoot());
        // Define click listener for the ViewHolder's View

        textView = metroCardBinding.metroTitle;
    }

    public TextView getTextView() {
        return textView;
    }

}
