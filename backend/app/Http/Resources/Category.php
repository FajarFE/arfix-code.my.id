<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class Category extends ResourceCollection
{
  public $status;
  public $message;
  public $resource;
  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */

  /**
   * __construct
   *
   * @param  mixed $status
   * @param  mixed $message
   * @param  mixed $resource
   * @return void
   */
  public function __construct($status, $message, $resource)
  {
    parent::__construct($resource);
    $this->status  = $status;
    $this->message = $message;
  }
  public function toArray(Request $request): array
  {
    return [
      'success'   => $this->status,
      'message'   => $this->message,
      'data'      => $this->resource
    ];
  }
}
