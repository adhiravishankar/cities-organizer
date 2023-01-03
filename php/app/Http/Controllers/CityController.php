<?php

namespace App\Http\Controllers;

use App\Models\City;
use Illuminate\Support\Collection;

class CityController extends Controller
{
    /**
     * Show a list of cities
     *
     * @return Collection
     */
    public function getCities(): Collection
    {
        return City::all();
    }
}
