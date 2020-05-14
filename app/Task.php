<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    /**
     * Indicates if the model should be timestamped with created_at and updated_at
     * @var bool
     */
    public $timestamps = false;

    /**
     * The attributes that should be cast to native types.
     * @var array
     */
    protected $casts = [
        'completed_date' => 'date:m/d/Y',
        'due_date' => 'date:m/d/Y',
        'completed' => 'boolean'
    ];

    protected $fillable = ['name', 'description', 'due_date', 'completed', 'completed_date'];
}
