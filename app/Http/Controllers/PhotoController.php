<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;
use App\Http\Requests\PhotoUploadRequest;
use App\Models\Photo;

class PhotoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('Photos/Index', [
            'photos' => $request->user()->photos()->latest()->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PhotoUploadRequest $request): RedirectResponse
    {

        $validated = $request->validated();

        $photos = array_map(function ($file) {
            return Photo::fromUpload($file);
        }, $validated['photo_files']);

        $request->user()->photos()->saveMany($photos);

        return redirect(route('photos.index'));
    }

    public function thumbnail(Photo $photo): StreamedResponse
    {
        $name = 'thumbnail-' . $photo->name;
        $path = $this->getThumbnailPath($photo);
        if (!Storage::fileExists($path)) {
            $this->createThumbnail($photo);
        }
        return Storage::download($path, $name);
    }

    /**
     * Display the specified resource.
     */
    public function show(Photo $photo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Photo $photo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Photo $photo): RedirectResponse
    {

        $this->authorize('update', $photo);

        $validated = $request->validate([
            'caption' => 'nullable|string|max:2048'
        ]);

        $photo->update($validated);

        return redirect(route('photos.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Photo $photo): RedirectResponse
    {
        $this->authorize('delete', $photo);

        $photo->delete();

        Storage::delete($this->getThumbnailPath($photo));

        Storage::delete("photos/{$photo->id}.{$photo->extension}");

        return redirect(route('photos.index'));
    }

    private function getThumbnailPath(Photo $photo): string
    {
        return 'photos/thumbnails/' . $photo->id . '.' . $photo->extension;
    }

    private function createThumbnail(Photo $photo)
    {
        $path = "photos/{$photo->id}.{$photo->extension}";
        $image = Image::make(Storage::path($path));
        $image
            ->fit(180, 120, function ($constraint) {
                $constraint->upsize();
            })
            ->save(Storage::path($this->getThumbnailPath($photo)));
    }
}