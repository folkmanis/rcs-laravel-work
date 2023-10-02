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

class Photo extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';
    public $incrementing = 'false';
    protected $keyType = 'string';

    protected $fillable = [
        'caption',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function messages(): BelongsToMany
    {
        return $this->belongsToMany(Message::class);
    }

    public static function fromUpload(UploadedFile $file): Photo
    {

        $photo = new Photo();

        $id = Str::orderedUuid();
        $path = $file->storeAs('photos', $id . '.' . $file->extension());

        $image = Image::make(Storage::path($path));

        dd($image->exif());

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
