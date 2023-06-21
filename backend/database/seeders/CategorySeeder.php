<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('categories')->insert([
            ['name' => 'React.Js', 'tipe_id' => 1, 'image_1' => 'http://127.0.0.1:8000/storage/posts/react.svg'],
            ['name' => 'Angular', 'tipe_id' => 1, 'image_1' => 'http://127.0.0.1:8000/storage/posts/angular.svg'],
            ['name' => 'Vue.js', 'tipe_id' => 1, 'image_1' => 'http://127.0.0.1:8000/storage/posts/vuejs.svg'],
            ['name' => 'Laravel', 'tipe_id' => 2, 'image_1' => 'http://127.0.0.1:8000/storage/posts/laravel.svg'],
            ['name' => 'Node.js', 'tipe_id' => 2, 'image_1' => 'app/public/categories/node-js.svg'],
            ['name' => 'Django', 'tipe_id' => 2, 'image_1' => 'app/public/categories/django.svg'],
            ['name' => 'React. Js + Laravel', 'tipe_id' => 3, 'image_1' => 'app/public/categories/sImPXlRArSjecIkVzCl4ststOFx693S5mFb3OmZu.png'],
            ['name' => 'Angular + Node.js', 'tipe_id' => 3, 'image_1' => 'app/public/categories/github.svg'],
            ['name' => 'Vue.js + Django', 'tipe_id' => 3, 'image_1' => 'app/public/categories/dR00guxYxJQsVlQakLQzIWdl5nL2xesw0C6f7hBI.png'],
            ['name' => 'Ruby on Rails', 'tipe_id' => 2, 'image_1' => 'app/public/categories/rubyonrails.svg'],
            ['name' => 'Python Flask', 'tipe_id' => 2, 'image_1' => 'app/public/categories/flask.svg'],
            ['name' => 'Express.js', 'tipe_id' => 2, 'image_1' => 'app/public/categories/express.svg'],
            ['name' => 'Spring Boot', 'tipe_id' => 2, 'image_1' => 'app/public/categories/springboot.svg'],
            ['name' => 'CodeIgniter', 'tipe_id' => 2, 'image_1' => 'app/public/categories/codeigniter.svg'],
            ['name' => 'ASP.NET', 'tipe_id' => 2, 'image_1' => 'app/public/categories/aspnet-svgrepo-com.svg'],
            ['name' => 'Svelte', 'tipe_id' => 1, 'image_1' => 'app/public/categories/svelte-svgrepo-com.svg'],
            ['name' => 'Symfony', 'tipe_id' => 2, 'image_1' => 'app/public/categories/symfony.svg'],
        ]);
    }
}
