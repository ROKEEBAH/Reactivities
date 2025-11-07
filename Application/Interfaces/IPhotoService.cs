using System;
using Application.Profiles.DTO;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces;

public interface IPhotoService
{
    Task<PhotoUploadResult?> UploadPhoto(IFormFile file);
    Task<String> DeletePhoto(string publicId);
}
