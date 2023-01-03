<?php

namespace App\Http\Controllers;

use App\Models\Metro;
use Illuminate\Http\Request;
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
        return Metro::all();
    }

    /**
     * Show a metro
     *
     * @param $id
     * @return Metro
     */
    public function readMetro($id): Metro
    {
        return Metro::find($id)->first();
    }


    /**
     * Show a metro
     *
     * @param $request Request
     * @return object
     */
    public function createMetro($request): object
    {
        $metro = new Metro();
        $metro->name = $request->name;
        $metro->save();
    }

}
