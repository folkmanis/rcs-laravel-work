<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Photo;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MessagePhotoController extends Controller
{
    /**
     * Show the form for creating the new resource.
     */
    public function create(Message $message): never
    {
        abort(404);
    }

    /**
     * Store the newly created resource in storage.
     */
    public function store(Request $request, Message $message): never
    {
        abort(404);
    }

    /**
     * Display the resource.
     */
    public function show(Message $message)
    {
    }

    /**
     * Show the form for editing the resource.
     */
    public function edit(Request $request, Message $message): Response
    {
        return Inertia::render('Messages/MessagePhotos/MessagePhotosEdit', [
            'message' => $message,
            'photos' => $request->user()->photos()->latest()->get(),
        ]);
    }

    /**
     * Update the resource in storage.
     */
    public function update(Request $request, Message $message): RedirectResponse
    {

        $this->authorize('update', $message);

        $validated = $request->validate([
            'photos' => 'present|array',
            'photos.*' => 'string|distinct'
        ]);
        $message->photos()->sync($validated['photos']);
        return redirect(route('messages.index'));
    }

    /**
     * Remove the resource from storage.
     */
    public function destroy(Message $message): never
    {
        abort(404);
    }
}
