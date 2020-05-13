<?php

use Illuminate\Database\Seeder;
use App\Task;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        factory(Task::class, 10)->state('complete')->create();
        factory(Task::class, 10)->state('incomplete')->create();
    }
}
