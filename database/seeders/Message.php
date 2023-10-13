<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Message as ModelsMessage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class Message extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ModelsMessage::factory()
            ->count(10)
            ->has(
                Comment::factory()
                    ->count(rand(0, 5))
            )
            ->create();
    }
}
