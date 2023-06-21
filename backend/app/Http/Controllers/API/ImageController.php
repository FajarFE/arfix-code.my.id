<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ImageController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'images.*' => 'required|image|max:2048', // validasi image maksimal 2MB
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $images = $request->file('images');
        $paths = [];

        foreach ($images as $image) {
            $paths[] = $image->storeAs('public/images', $image->hashName());
        }

        $image = new Image();
        $image->paths = $paths;
        $image->save();

        $image->paths = collect($image->paths)->map(fn ($path) => asset($path))->toArray();

        return response()->json(['message' => 'Gambar berhasil diunggah', 'data' => $image], 201);
    }

    public function show(Image $image, $index)
    {
        return response()->file(storage_path('app/' . $image->getPath($index)));
    }

    public function index()
    {
        $images = Image::all();
        return response()->json(['images' => $images], 200);
    }
}
