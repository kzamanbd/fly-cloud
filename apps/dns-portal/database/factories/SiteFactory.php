<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Site>
 */
class SiteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->domainWord,
            'domain' => $this->faker->domainName,
            'ip_address' => $this->faker->ipv4,
            'port' => $this->faker->numberBetween(1, 65535),
            'username' => $this->faker->userName,
            'path' => '/var/www/' . $this->faker->userName
        ];
    }
}
