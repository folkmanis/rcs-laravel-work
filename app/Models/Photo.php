<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;
use Illuminate\Http\UploadedFile;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Photo extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';
    public $incrementing = 'false';
    protected $keyType = 'string';

    protected $touches = ['messages'];

    protected $fillable = ['caption'];

    protected $appends = ['url', 'thumbnail_url'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function messages(): BelongsToMany
    {
        return $this->belongsToMany(Message::class);
    }

    protected function thumbnailUrl(): Attribute
    {
        return new Attribute(
            get: fn () => '/photos/' . $this->id . '/thumbnail'
        );
    }

    protected function url(): Attribute
    {
        return new Attribute(
            get: fn () => Storage::url('photos/' . $this->id . '.' . $this->extension)
        );
    }

    protected function thumbnailPath(): Attribute
    {
        return new Attribute(
            get: fn () => 'photos/thumbnails/' . $this->id . '.' . $this->extension
        );
    }

    protected function path(): Attribute
    {
        return new Attribute(
            get: fn () => 'photos/' . $this->id . '.' . $this->extension
        );
    }

    public function createThumbnailIfNotExists()
    {
        if (!Storage::fileExists($this->thumbnail_path)) {
            $image = Image::make(Storage::path($this->path));
            $image
                ->fit(180, 120, function ($constraint) {
                    $constraint->upsize();
                })
                ->save(Storage::path($this->thumbnail_path));
        }
    }

    public static function fromUpload(UploadedFile $file): Photo
    {

        $photo = new Photo();

        $id = Str::orderedUuid();
        $path = $file->storeAs('photos', $id . '.' . $file->extension());

        $image = Image::make(Storage::path($path));

        $caption = $image->exif('Caption');
        if (strlen($caption) > 2048) {
            $caption = substr($caption, 0, 2048);
        }

        $photo->id = $id;
        $photo->name = $file->getClientOriginalName();
        $photo->extension = $file->extension();
        $photo->caption = $caption;
        $photo->height = $image->height();
        $photo->width = $image->width();

        return $photo;
    }
}
