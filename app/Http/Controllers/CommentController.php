<?php

namespace App\Http\Controllers;

use App\Http\Requests\CommentUpdateRequest;
use App\Models\Comment;
use App\Models\Message;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class CommentController extends Controller
{

    /**
     * Store a newly created resource in storage.
     */
    public function store(CommentUpdateRequest $request, Message $message): RedirectResponse
    {

        $validated = $request->validated();

        $comment = new Comment($validated);
        $comment->user()->associate($request->user());

        $message->comments()->save($comment);

        return back();
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(CommentUpdateRequest $request, Comment $comment)
    {
        $this->authorize('update', $comment);

        $validated = $request->validated();

        $comment->update(['text' => $validated['text']]);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Comment $comment): RedirectResponse
    {
        $this->authorize('delete', $comment);

        $comment->delete();

        return back();
    }

    public function vote(Request $request, Comment $comment): RedirectResponse
    {

        $user = $request->user();

        $validated = $request->validate([
            'rating' => 'required|numeric|integer|max:1|min:-1'
        ]);

        $comment->votes()->detach($user->id);

        $comment->votes()->attach($user->id, ['rating' => $validated['rating']]);

        return back();
    }
}
