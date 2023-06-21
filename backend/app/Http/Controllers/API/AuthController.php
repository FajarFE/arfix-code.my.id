<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register', 'update',]]);
    }

    public function users(Request $request)
    {
        $user = Auth::user();
        return response()->json([
            'user' => $user
        ]);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'string|email|max:255',
            'password' => 'string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'The given data was invalid',
                'errors' => $validator->errors(),
            ], 422);
        }
        $credentials = $request->only('email', 'password');
        $token = Auth::attempt($credentials);

        if (!$token) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 401);
        }

        $user = Auth::user();
        return response()->json([
            'user' => $user,
            'authorization' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|unique:users|string|email|max:255',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'The given data was invalid',
                'errors' => $validator->errors(),
            ], 422);
        }
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'avatar' => 'profile.svg',
        ]);
        if (!$user) {
            return response()->json([
                'message' => 'User not created',
            ], 500);
        }

        return response()->json([
            'message' => 'User created successfully',
            'user' => $user
        ]);
    }




    public function logout()
    {
        Auth::logout();
        return response()->json([
            'message' => 'Successfully logged out',
        ]);
    }


    public function update(Request $request, $id)
    {
        $user = Auth::user();

        if ($user->id != $id) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 401);
        }

        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'string|max:255',
                'email' => 'string|email|max:255|unique:users,email,' . $id,
                'password' => [
                    'string',
                    'min:8',
                    'regex:/[a-zA-Z]/', // Memerlukan setidaknya satu huruf alfabet
                    'regex:/[0-9]/', // Memerlukan setidaknya satu angka
                    'regex:/[@$!%*#?&]/', // Memerlukan setidaknya satu karakter khusus
                ],
                'confirm_password' => 'required_with:current_password|same:current_password',
                'current_password' => 'required',
                'motivation' => 'string|max:255',
                'avatar' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ],
            [
                'password.string' => 'Password harus berupa string.',
                'password.min' => 'Password harus memiliki setidaknya 8 karakter.',
                'password.regex' => 'Password harus mengandung setidaknya satu huruf alfabet, satu angka, dan satu karakter khusus.',
                'confirm_password.required_with' => 'Konfirmasi password harus diisi ketika password diisi.',
                'confirm_password.same' => 'Konfirmasi password harus sama dengan password lama.',
                'current_password.required' => 'Password saat ini harus diisi.',
            ]
        );

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 400);
        }

        $userToUpdate = User::find($id);

        if (!$userToUpdate) {
            return response()->json([
                'message' => 'User not found',
            ], 404);
        }

        // Verifikasi password saat ini
        if ($request->has('current_password')) {
            if (!Hash::check($request->current_password, $userToUpdate->password)) {
                return response()->json([
                    'message' => 'Current password is incorrect',
                ], 400);
            }
        }

        // Perbarui data sesuai permintaan pengguna
        $userToUpdate->name = $request->input('name', $userToUpdate->name);
        $userToUpdate->email = $request->input('email', $userToUpdate->email);
        $userToUpdate->motivation = $request->input('motivation', $userToUpdate->motivation);

        // Periksa apakah ada perubahan password
        if ($request->has('password')) {
            // Perbarui password baru
            $userToUpdate->password = Hash::make($request->input('password'));
        }

        // Periksa apakah ada file gambar avatar yang diunggah
        if ($request->hasFile('avatar')) {
            $avatar = $request->file('avatar');
            $avatar->storeAs('public/avatars', $avatar->hashName());
            $userToUpdate->avatar = $avatar->hashName();
        }

        // Simpan perubahan data
        $userToUpdate->save();

        return response()->json([
            'message' => 'Data updated successfully',
            'data' => $userToUpdate,
        ], 200);
    }



    public function refresh()
    {
        return response()->json([
            'user' => Auth::user(),
            'authorisation' => [
                'token' => Auth::refresh(),
                'type' => 'bearer',
            ]
        ]);
    }
}
