package com.adhiravishankar.citiesorganizer.modeldiffs;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.DiffUtil;

import com.adhiravishankar.citiesorganizer.models.Metro;

public class MetroDiff extends DiffUtil.ItemCallback<Metro> {


    @Override
    public boolean areItemsTheSame(@NonNull Metro oldItem, @NonNull Metro newItem) {
        return oldItem.getID().equals(newItem.getID());
    }

    @Override
    public boolean areContentsTheSame(@NonNull Metro oldItem, @NonNull Metro newItem) {
        return oldItem.getName().equals(newItem.getName())
                && oldItem.getFeaturedImage().equals(newItem.getFeaturedImage());
    }
}
