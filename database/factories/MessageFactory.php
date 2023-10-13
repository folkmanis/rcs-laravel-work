<?php

namespace Database\Factories;

use App\Models\User;
use DateInterval;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Message>
 */
class MessageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $dateCreated = fake()->dateTimeThisMonth();
        $dateEdited = rand(0, 10) > 5 ? fake()->dateTimeBetween($dateCreated) : $dateCreated;
        return [
            'text' => fake()->paragraph(2),
            'user_id' => User::all()->random()->id,
            'created_at' => $dateCreated,
            'updated_at' => $dateEdited,
        ];
    }
}
