<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\MorphPivot;

class Vote extends MorphPivot
{
    public $incrementing = true;
}
