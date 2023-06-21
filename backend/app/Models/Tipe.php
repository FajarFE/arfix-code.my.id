<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tipe extends Model
{
    use HasFactory;

    protected $guarded = [
        'id',
    ];

    protected $table = 'tipe';

    public function isfrontend()
    {
        if ($this->name == 'frontend') {
            return true;
        } else {
            return false;
        }
    }
    public function isbacked()
    {
        if ($this->name == 'backend') {
            return true;
        } else {
            return false;
        }
    }

    public function isfullstack()
    {
        if ($this->name == 'fullstack') {
            return true;
        } else {
            return false;
        }
    }
}
