<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Requests\StoreMessageRequest;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Storage;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {

        $messages = Message::with([
            'user:id,name',
            'photos',
            'comments' => function (MorphMany $query) {
                $query
                    ->with([
                        'user:id,name',
                        'votes'
                    ])
                    ->withSum('votes', 'votables.rating')
                    ->oldest();
            },
            'votes',
        ])
            ->withCount('comments')
            ->withSum('votes', 'votables.rating')
            ->latest()
            ->paginate(20);

        $photos = Inertia::lazy(
            fn () => $request
                ->user()
                ->photos()
                ->latest()
                ->get()
        );

        // $messagePhotos = Inertia::lazy(
        //     fn () => Message::find($request->query('message_photos'))->photos()->get()
        //         ->map(function ($photo) {
        //             $photo['url'] = Storage::url('photos/' . $photo->id . '.' . $photo->extension);
        //             $photo['thumbnailUrl'] = $photo->thumbnailUrl();
        //             return $photo;
        //         })
        // );

        // $message = Inertia::lazy(
        //     fn () => $request->user()->messages()->find($request->query('message'))
        // );

        return Inertia::render('Messages/Index', [
            'messages' => $messages,
            'photos' => $photos,
            // 'message' => $message,
            // 'messagePhotos' => $messagePhotos
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
    public function store(StoreMessageRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $message = $request
            ->user()
            ->messages()
            ->create([
                'text' => $validated['text']
            ]);
        $message->photos()->attach($validated['photos']);
        return redirect(route('messages.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Message $message)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Message $message)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreMessageRequest $request, Message $message): RedirectResponse
    {

        $this->authorize('update', $message);

        $validated = $request->validated();

        $message->update([
            'text' => $validated['text']
        ]);
        $message->photos()->sync($validated['photos']);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Message $message): RedirectResponse
    {
        $this->authorize('delete', $message);

        $message->delete();

        return redirect(route('messages.index'));
    }

    public function vote(Request $request, Message $message): RedirectResponse
    {

        $user = $request->user();

        $validated = $request->validate([
            'rating' => 'required|numeric|integer'
        ]);

        $message->votes()->detach($user->id);

        if ($validated['rating'] !== 0) {
            $message->votes()->attach($user->id, ['rating' => $validated['rating']]);
        }

        return back();
    }
}
