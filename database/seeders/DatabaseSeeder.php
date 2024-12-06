<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Seeder;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'id' => 1,
            'name' => 'Igor Kos',
            'email' => 'igor@example.com',
            'role' => User::ROLE_ADMIN,
            'password' => bcrypt('Test1234'),
            'email_verified_at' => time()
        ]);
        User::factory()->create([
            'id' => 2,
            'name' => 'John Smith',
            'email' => 'john@example.com',
            'password' => bcrypt('Test1234'),
            'email_verified_at' => time()
        ]);

        Project::factory()
            ->count(5)
            ->has(Task::factory()->count(5))
            ->create();
    }
}
