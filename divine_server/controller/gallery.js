const catchAsyncError = require("../middlwares/catchAsyncError");
const Gallery = require("../models/gallery");
const { uploadFileToCloudinary } = require("../config/cloudinary");
const fs = require("fs").promises;
const cloudinary = require("cloudinary");
const createGalleryImage = catchAsyncError(async (req, res) => {
  const { title, date, category, description, orientation } = req.body;
  if (!title || !date || !category || !description) {
    return res
      .status(400)
      .json({ success: false, message: "All fields and image are required" });
  }
  const mediaFiles = req.files?.media || [];
  const media = [];

  for (const file of mediaFiles) {
    const uploaded = await uploadFileToCloudinary(file);

    media.push({
      url: uploaded.url,
      type: uploaded.type,
      pdfUrl: uploaded.pdfUrl || null,
    });

    fs.unlink(file.path, () => {});
  }
  const gallery = await Gallery.create({
    title,
    date,
    category,
    description,
    orientation,
    media,
  });
  res.status(201).json({ success: true, data: gallery });
});

const getAllGalleryImages = catchAsyncError(async (req, res) => {
  const images = await Gallery.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, data: images });
});
const getGalleryImageById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params; // URL-ൽ നിന്ന് (ഉദാഹരണത്തിന്: /api/v1/gallery/64a7c...) ID എടുക്കുന്നു

  const image = await Gallery.findById(id);

  // തന്നിരിക്കുന്ന ID-യിൽ ഇമേജ് ഒന്നും കണ്ടെത്തിയില്ലെങ്കിൽ
  if (!image) {
    return res.status(404).json({
      success: false,
      message: "Image not found!",
    });

    // ശ്രദ്ധിക്കുക: നിങ്ങളുടെ പ്രൊജക്റ്റിൽ ഒരു കസ്റ്റം ErrorHandler ക്ലാസ് ഉണ്ടെങ്കിൽ താഴെ പറയുന്ന രീതിയിലും ചെയ്യാം:
    // return next(new ErrorHandler("Image not found!", 404));
  }

  // ഇമേജ് ഉണ്ടെങ്കിൽ അത് റെസ്പോൺസ് ആയി അയക്കുന്നു
  res.status(200).json({
    success: true,
    data: image,
  });
});
const updateGalleryImages = catchAsyncError(async (req, res, next) => {
  const gallery = await Gallery.findById(req.params.id);
  if (!gallery) return next(new ErrorHandler("gallery not found", 404));

  const {
    title,

    date,

    category,

    description,

    existingImage,
  } = req.body;

  // ✅ CORRECT: req.files is { media: [file] }
  const mediaFiles = req.files?.media || [];
  let media = gallery.media; // keep existing by default

  if (mediaFiles.length > 0) {
    // New image uploaded – replace old one
    const uploaded = await uploadFileToCloudinary(mediaFiles[0]);
    media = [
      {
        url: uploaded.url,
        type: uploaded.type,
        pdfUrl: uploaded.pdfUrl || null,
      },
    ];
    // Clean up temp file
    await fs.unlink(mediaFiles[0].path).catch(() => {});
  }
  // else if existingImage is present, we keep the original media (already set)
  // else optionally clear media: media = [];

  const updateData = {
    title: title || gallery.title,
    date: date || gallery.date,
    category: category || gallery.category,

    description: description || gallery.description,

    media,
  };

  const updatedGallery = await Gallery.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true, runValidators: true },
  );

  res.status(200).json({ success: true, data: updatedGallery });
});
const deleteGalleryImage = catchAsyncError(async (req, res, next) => {
  // 1. ഡാറ്റാബേസിൽ ഇങ്ങനെ ഒരു ഗാലറി ഐറ്റം ഉണ്ടോ എന്ന് നോക്കുക
  const gallery = await Gallery.findById(req.params.id);
  if (!gallery) {
    return next(new ErrorHandler("Gallery item not found", 404));
  }

  // 2. Cloudinary-ൽ നിന്ന് ഇമേജ് ഡിലീറ്റ് ചെയ്യുക
  if (gallery.media && gallery.media.length > 0) {
    const mediaItem = gallery.media[0];

    // നിങ്ങളുടെ ഡാറ്റാബേസിൽ public_id സേവ് ചെയ്തിട്ടുണ്ടെങ്കിൽ അത് എടുക്കുക (e.g., mediaItem.public_id)
    // അതല്ലെങ്കിൽ URL-ൽ നിന്ന് public_id കണ്ടുപിടിക്കുന്ന ലോജിക് താഴെ നൽകുന്നു:
    let publicId = mediaItem.public_id;

    if (!publicId && mediaItem.url) {
      // URL ഇതാണെങ്കിൽ: https://res.cloudinary.com/demo/image/upload/v123456/folder/image_name.jpg
      // അതിൽ നിന്ന് 'folder/image_name' മാത്രം വേർതിരിച്ചെടുക്കുന്നു
      const urlParts = mediaItem.url.split("/");
      const fileNameWithExtension = urlParts.pop(); // e.g., "image_name.jpg"
      const fileName = fileNameWithExtension.split(".")[0]; // e.g., "image_name"

      // ഒരുപക്ഷേ ഫോൾഡർ ഉണ്ടെങ്കിൽ (e.g., upload/v123456/gallery/image_name)
      const uploadIndex = urlParts.indexOf("upload");
      if (uploadIndex !== -1 && urlParts.length > uploadIndex + 2) {
        // v123456 പോലുള്ള വേർഷൻ നമ്പർ ഒഴിവാക്കി ബാക്കി ഫോൾഡർ പാത്ത് എടുക്കുന്നു
        const folderPath = urlParts.slice(uploadIndex + 2).join("/");
        publicId = folderPath ? `${folderPath}/${fileName}` : fileName;
      } else {
        publicId = fileName;
      }
    }

    // Cloudinary-ൽ നിന്ന് ഫയൽ ഡിലീറ്റ് ചെയ്യുന്നു
    if (publicId) {
      // resource_type ഇമേജ് ആണോ വീഡിയോ ആണോ എന്ന് നോക്കുന്നു (നിങ്ങളുടെ ആവശ്യാനുസരണം മാറ്റാം)
      const resourceType = mediaItem.type === "pdf" ? "raw" : "image";

      await cloudinary.v2.uploader
        .destroy(publicId, {
          resource_type: resourceType,
        })
        .catch((err) => {
          console.error("Cloudinary deletion failed:", err);
        });
    }
  }

  // 3. ഡാറ്റാബേസിൽ നിന്ന് ഗാലറി ഐറ്റം പൂർണ്ണമായി ഡിലീറ്റ് ചെയ്യുന്നു
  await gallery.deleteOne(); // അല്ലെങ്കിൽ Gallery.findByIdAndDelete(req.params.id);

  // 4. സക്സസ് റെസ്പോൺസ് അയക്കുന്നു
  res.status(200).json({
    success: true,
    message: "Gallery image and associated media deleted successfully",
  });
});
module.exports = {
  getAllGalleryImages,
  createGalleryImage,
  getGalleryImageById,
  updateGalleryImages,
  deleteGalleryImage,
};
