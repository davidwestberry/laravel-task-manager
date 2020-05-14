<?php


namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Task;

class TaskTest extends TestCase
{
    use RefreshDatabase;

    public function testInsertTask()
    {
        $task = factory(Task::class)->make();
        $response = $this->postJson('/api/task', $task->toArray());

        $response
            ->assertStatus(200)
            ->assertJson(['name'=>$task->name]);

        $this->assertDatabaseHas('tasks', ['name' => $task->name]);
    }

    public function testGetAllTasks()
    {
        factory(Task::class, 10)->state('complete')->create();
        factory(Task::class, 10)->state('incomplete')->create();

        $response = $this->get('/api/tasks');
        $response
            ->assertStatus(200)
            ->assertJsonCount(20);
    }

    public function testCompleteTask()
    {
        $task = factory(Task::class)->create();
        $this->assertTrue($task->id != null);

        $response = $this->putJson('/api/tasks/'.$task->id, ['id'=>$task->id, 'completed'=>true]);
        $response
            ->assertStatus(200)
            ->assertJsonCount(1);
    }

    public function testDeleteTask()
    {
        $task = factory(Task::class)->create();
        $this->assertTrue($task->id != null);

        $response = $this->delete('/api/tasks/'.$task->id);
        $response->assertStatus(200);
        $this->assertDeleted('tasks', $task->toArray());
    }
}
