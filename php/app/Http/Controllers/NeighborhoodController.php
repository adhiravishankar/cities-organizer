<?php

namespace App\Http\Controllers;

use App\Models\Neighborhood;
use Illuminate\Support\Collection;

class NeighborhoodController extends Controller
{
    /**
     * Show a list of neighborhoods
     *
     * @return Collection
     */
    public function getNeighborhoods(): Collection
    {
        return Neighborhood::all();
    }
}
