<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;

    protected $fillable = ['paths'];

    protected $casts = [
        'paths' => 'array'
    ];

    public function getPathsAttribute($value): array
    {
        $paths = json_decode($value, true);
        $publicPaths = [];
        foreach ($paths as $path) {
            if (strpos($path, 'http') === 0) {
                $publicPaths[] = $path;
            } else {
                $publicPaths[] = asset('storage/' . $path);
            }
        }
        return $publicPaths;
    }

    public function setPathsAttribute(array $value): void
    {
        $paths = [];
        foreach ($value as $path) {
            $paths[] = str_replace('public/', '', $path);
        }
        $this->attributes['paths'] = json_encode($paths);
    }
}
