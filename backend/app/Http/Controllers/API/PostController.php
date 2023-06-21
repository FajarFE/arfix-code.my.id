<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Category;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Http\Resources\PostResource;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;


class PostController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        $status_id = $request->input('status_id');
        $category_id = $request->input('category_id');
        $create_at = $request->input('create_at');
        $searchTerm = $request->input('search_term');
        $limit = $request->input('limit', 12);

        if ($status_id || $category_id || $searchTerm || $create_at || $limit) {
            $posts = Post::join('statuses', 'posts.status_id', '=', 'statuses.id')
                ->join('categories', 'posts.category_id', '=', 'categories.id')
                ->join('users', 'posts.user_id', '=', 'users.id')
                ->join('tipe', 'categories.tipe_id', '=', 'tipe.id')
                ->select('posts.*', 'statuses.name as status_name', 'categories.name as category_name', 'users.name as user_name', 'users.avatar as user_avatar', 'categories.paths as img', 'users.motivation as quote', 'tipe.name as tipe_name')
                ->when($status_id, function ($query) use ($status_id) {
                    return $query->where('status_id', $status_id);
                })
                ->when($category_id, function ($query) use ($category_id) {
                    return $query->where('category_id', $category_id);
                })
                ->where(function ($query) use ($searchTerm) {
                    $query->where('statuses.name', 'LIKE', '%' . $searchTerm . '%')
                        ->orWhere('categories.name', 'LIKE', '%' . $searchTerm . '%')
                        ->orWhere('posts.title', 'LIKE', '%' . $searchTerm . '%');
                })
                ->when($create_at, function ($query) use ($create_at) {
                    if ($create_at == 'hari ini') {
                        return $query->whereDate('posts.created_at', Carbon::today());
                    } elseif ($create_at == 'minggu ini') {
                        $startOfWeek = Carbon::now()->startOfWeek();
                        $endOfWeek = Carbon::now()->endOfWeek();
                        return $query->whereBetween('posts.created_at', [$startOfWeek, $endOfWeek]);
                    } elseif ($create_at == 'bulan ini') {
                        return $query->whereMonth('posts.created_at', Carbon::now()->month);
                    } elseif ($create_at == 'tahun ini') {
                        return $query->whereYear('posts.created_at', Carbon::now()->year);
                    } elseif ($create_at == 'terbaru') {
                        return $query->orderBy('posts.created_at', 'desc');
                    } elseif ($create_at == 'terlama') {
                        return $query->orderBy('posts.created_at', 'asc');
                    }
                })
                ->paginate($limit);
        } elseif ($user) {
            $posts = Post::join('statuses', 'posts.status_id', '=', 'statuses.id')
                ->join('categories', 'posts.category_id', '=', 'categories.id')
                ->join('users', 'posts.user_id', '=', 'users.id')
                ->join('tipe', 'categories.tipe_id', '=', 'tipe.id')
                ->where('posts.user_id', $user->id)
                ->select(
                    'posts.*',
                    'statuses.name as status_name',
                    'categories.name as category_name',
                    'users.name as user_name',
                    'users.avatar as user_avatar',
                    'categories.paths as img',
                    'users.motivation as quote',
                    'tipe.name as tipe_name'
                )
                ->get();
        } else {
            $posts = Post::join('statuses', 'posts.status_id', '=', 'statuses.id')
                ->join('categories', 'posts.category_id', '=', 'categories.id')
                ->join('users', 'posts.user_id', '=', 'users.id')
                ->join('tipe', 'categories.tipe_id', '=', 'tipe.id')
                ->select('posts.*', 'statuses.name as status_name', 'categories.name as category_name', 'users.name as user_name', 'users.avatar as user_avatar', 'categories.paths as img', 'users.motivation as quote', 'tipe.name as tipe_name')
                ->orderBy('created_at', 'desc')
                ->limit(1)
                ->get();
        }
        $posts->map(function ($post) {
            $paths = json_decode($post->img); // Decode the JSON string into an array

            // Convert each path to the desired format
            $convertedPaths = collect($paths)->map(function ($path) {
                return 'http://localhost:8000/storage/' . $path; // Modify this to match your storage path
            });

            // Replace the 'img' attribute with the converted paths
            $post->img = $convertedPaths;

            return $post;
        });



        return response()->json($posts);
    }



    public function headline()
    {
        $posts = Post::orderBy('id', 'desc')->take(1)->get();
        return response()->json([
            'success' => true,
            'message' => 'List Data Posts',
            'data' => $posts
        ]);
    }

    public function store(Request $request)
    {


        $user = Auth::user();

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'images.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'status_id' => 'required|in:1,2,3',
            'category_id' => 'required|in:1,2,3',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation Error',
                'errors' => $validator->errors()
            ], 400);
        }

        $images = $request->file('images');
        $paths = [];

        if (count($images) < 3 || count($images) > 3) {
            return response()->json([
                'success' => false,
                'message' => 'You must upload exactly 3 images.',
            ], 400);
        }

        foreach ($images as $image) {
            $paths[] = $image->storeAs('public/images', $image->hashName());
        }

        $paths = collect($paths)->map(fn ($path) => str_replace('public/', '', $path))->toArray();

        $post = new Post();
        $post->title = $request->input('title');
        $post->content = $request->input('content');
        $post->status_id = $request->input('status_id');
        $post->category_id = $request->input('category_id');
        $post->paths = $paths;
        $post->user_id = $user->id;
        $post->save();

        return response()->json($post, 201);
    }


    public function show($id)
    {
        // Find post by ID
        $post = Post::join('statuses', 'posts.status_id', '=', 'statuses.id')
            ->join('categories', 'posts.category_id', '=', 'categories.id')
            ->join('users', 'posts.user_id', '=', 'users.id')
            ->join('tipe', 'categories.tipe_id', '=', 'tipe.id')
            ->select('posts.*', 'statuses.name as status_name', 'categories.name as category_name', 'users.name as user_name', 'users.avatar as user_avatar', 'categories.paths as img', 'users.motivation as quote', 'tipe.name as tipe_name')
            ->where('posts.id', $id)
            ->first();

        if (!$post) {
            return response()->json(['error' => 'Post not found'], 404);
        }

        $paths = json_decode($post->img); // Decode the JSON string into an array

        // Convert each path to the desired format
        $convertedPaths = collect($paths)->map(function ($path) {
            return 'http://localhost:8000/storage/' . $path; // Modify this to match your storage path
        });

        // Replace the 'img' attribute with the converted paths
        $post->img = $convertedPaths;

        // Return single post as a resource
        return response()->json($post);
    }



    // buatkan method update
    public function update(Request $request, $id)
    {
        $user = Auth::user();

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'images.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'status_id' => 'required|in:1,2,3',
            'category_id' => 'required|in:1,2,3',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation Error',
                'errors' => $validator->errors()
            ], 400);
        }

        $post = Post::findOrFail($id);

        // Check if the authenticated user is the owner of the post
        if ($post->user_id !== $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 401);
        }

        $images = $request->file('images');
        $paths = [];

        if (count($images) < 3 || count($images) > 3) {
            return response()->json([
                'success' => false,
                'message' => 'You must upload exactly 3 images.',
            ], 400);
        }

        foreach ($images as $image) {
            $paths[] = $image->storeAs('public/images', $image->hashName());
        }

        $paths = collect($paths)->map(fn ($path) => str_replace('public/', '', $path))->toArray();

        $post->title = $request->input('title');
        $post->content = $request->input('content');
        $post->status_id = $request->input('status_id');
        $post->category_id = $request->input('category_id');
        $post->paths = $paths;
        $post->save();

        return response()->json($post, 200);
    }



    public function destroy($id)
    {

        //find post by ID
        $post = Post::find($id);

        //delete image
        Storage::delete('public/posts/' . basename($post->image));

        //delete post
        $post->delete();

        //return response
        return new PostResource(true, 'Data Post Berhasil Dihapus!', null);
    }
}
