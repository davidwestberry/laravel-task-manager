<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Task;
use Faker\Generator as Faker;

$factory->define(Task::class, function (Faker $faker) {
    return [
        'name'=>$faker->words($nb = 3, $asText = true),
        'completed_date'=>$faker->date($format = 'Y-m-d'),
        'description'=>$faker->sentence,
        'due_date'=>$faker->date($format = 'Y-m-d'),
        'completed'=>$faker->boolean($chanceOfGettingTrue = 30)
    ];
});

$factory->state(Task::class, 'incomplete', [
    'completed' => false
]);

$factory->state(Task::class, 'complete', [
    'completed' => true
]);
