<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\Category as CategoryResource;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use Illuminate\Support\Facades\Auth;


class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::join('tipe', 'categories.tipe_id', '=', 'tipe.id')
            ->select('categories.*', 'tipe.name as tipe_name')
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'List Data Posts',
            'data' => $categories
        ]);
    }


    public function tampil_tipe($tipe_id)
    {
        $categories = Category::where('tipe_id', $tipe_id)->get();
        return response()->json([
            'success' => true,
            'message' => 'List Data Posts',
            'data' => $categories
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ], 404);
        }
        // define validation rules
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'tipe_id' => 'required',
            'images.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        // check if validation fails
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $images = $request->file('images');
        $paths = [];

        foreach ($images as $image) {
            $paths[] = $image->storeAs('public/images', $image->hashName());
        }

        $paths = collect($paths)->map(fn ($path) => str_replace('public/', '', $path))->toArray();

        $category = new Category([
            'name' => $request->name,
            'tipe_id' => $request->tipe_id,
            'paths' => $paths,
        ]);

        $category->save();

        // set default value of null for image_1 if no image is uploaded
        return response()->json(['message' => 'Gambar berhasil diunggah', 'data' => $category], 201);
    }










    /**
     * Display the specified resource.
     */


    public function show(Category $category)
    {
        $categories = Category::find($category);
        return new CategoryResource(true, 'Detail Data Category', $category);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $validator = Validator::make($request->all(), [
            'name'     => 'required',
            'image'     => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'tipe_id'     => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        $image = $request->file('image');
        $image->storeAs('public/categories', $image->hashName());
        $category->update([
            'name'     => $request->name,
            'image'     => $image->hashName(),
            'tipe_id'     => $request->tipe_id,
        ]);
        return new CategoryResource(true, 'Data Category Berhasil Diubah!', $category);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $category->delete();
        return new CategoryResource(true, 'Data Category Berhasil Dihapus!', null);
    }
}
