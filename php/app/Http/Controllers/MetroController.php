<?php

namespace App\Http\Controllers;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class MetroController extends Controller
{

    /**
     * Show a list of metros
     *
     * @return Collection
     */
    public function getMetros(): Collection
    {
        return DB::table('metros')->get();
    }

    /**
     * Show a metro
     *
     * @param $id
     * @return object
     */
    public function readMetro($id): object
    {
        return DB::table('metros')->find($id)->first();
    }


    /**
     * Show a metro
     *
     * @param $metro
     * @return object
     */
    public function createMetro($metro): object
    {
        return DB::table('metros')->find($id)->first();
    }

}
