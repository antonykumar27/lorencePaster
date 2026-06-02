import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Calendar,
  Users,
  Church,
  PlusCircle,
  Edit,
  Trash2,
  Loader2,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import {
  useGetGalleryImagesQuery,
  useDeleteGalleryImageMutation,
} from "../store/GalleryApi";

// Delete Confirmation Modal Component
const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, isDeleting }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-md mx-4 shadow-xl">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          Delete Image
        </h3>
        <p className="text-slate-600 dark:text-slate-300 mb-6">
          Are you sure you want to delete this image? This action cannot be
          undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-gray-300 dark:hover:bg-slate-600 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition disabled:opacity-50 flex items-center gap-2"
          >
            {isDeleting ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Trash2 size={16} />
            )}
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    data: response,
    isLoading,
    isError,
    refetch,
  } = useGetGalleryImagesQuery();

  const [deleteGalleryImage, { isLoading: isDeleting }] =
    useDeleteGalleryImageMutation();

  // Extract gallery items from API response
  const galleryItems = useMemo(() => {
    if (!response?.data) return [];
    return response.data.map((item) => ({
      id: item._id,
      title: item.title,
      category: item.category,
      date: item.date,
      description: item.description,
      image: item.media?.[0]?.url || "",
      orientation: item.orientation || "landscape", // 1. മാറ്റം: ഇവിടെ ബാക്കെൻഡിൽ നിന്നുള്ള യഥാർത്ഥ orientation എടുത്തു!
    }));
  }, [response]);

  // Categories for filtering
  const categories = [
    { id: "all", label: "All", icon: ImageIcon },
    { id: "events", label: "Events", icon: Calendar },
    { id: "prayer", label: "Prayer Meetings", icon: Church },
    { id: "ministries", label: "Ministries", icon: Users },
  ];

  // Filter items based on selected category
  const filteredItems = useMemo(() => {
    if (selectedCategory === "all") return galleryItems;
    return galleryItems.filter((item) => item.category === selectedCategory);
  }, [galleryItems, selectedCategory]);

  // Lightbox handlers
  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + filteredItems.length) % filteredItems.length,
    );
  };

  // Delete handler
  const handleDeleteClick = (id) => {
    setSelectedImageId(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteGalleryImage(selectedImageId).unwrap();
      toast.success("Image deleted successfully!");
      setDeleteModalOpen(false);
      setSelectedImageId(null);
      refetch();
    } catch (err) {
      toast.error(err.data?.message || "Failed to delete image");
    }
  };

  // Edit handler
  const handleEditClick = (id) => {
    navigate(`/gallery/edit/${id}`);
  };

  // Keyboard navigation for lightbox
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, currentIndex]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 20 } },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin w-12 h-12 text-indigo-600" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Failed to load gallery images. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-500 min-h-screen">
      {/* Hero Header */}
      <section className="relative py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-transparent dark:from-indigo-950/20" />
        <div className="relative max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white">
            Our Ministry Gallery
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 mt-4">
            Capturing moments of worship, fellowship, and outreach – visual
            testimonies of God's faithfulness.
          </p>
        </div>
      </section>

      {/* Admin Action Buttons */}
      {user?.isAdmin && (
        <div className="max-w-7xl mx-auto px-6 mb-4 flex justify-end gap-3">
          <Link
            to="/gallery/create"
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-full shadow-md transition"
          >
            <PlusCircle size={18} />
            Add New Image
          </Link>
        </div>
      )}

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-6 pb-8">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === cat.id
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                  : "bg-white/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/40"
              }`}
            >
              <cat.icon size={16} />
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. മാറ്റം: ഇവിടെ ഗ്രിഡ് മാറ്റി സുന്ദരമായ CSS Columns (Masonry) ലേഔട്ട് നൽകി */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-6 pb-20 columns-1 sm:columns-2 lg:columns-3 gap-6"
      >
        {/* ഗാലറി കാർഡുകൾ ലൂപ്പ് ചെയ്യുന്ന ഭാഗം */}
        {filteredItems.map((item, idx) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="break-inside-avoid mb-6 relative rounded-2xl overflow-hidden shadow-lg cursor-pointer bg-slate-100 dark:bg-slate-900 block w-full group border border-slate-200/60 dark:border-slate-800"
            onClick={() => openLightbox(idx)}
          >
            {/* ഇമേജ് സെക്ഷൻ */}
            <div className="relative overflow-hidden bg-slate-200 dark:bg-slate-800">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* ഹോവർ ചെയ്യുമ്പോൾ മാത്രം വരുന്ന ഗ്രേഡിയന്റ് overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white text-xs line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>

            {/* താഴെ ടൈറ്റിലും ഡേറ്റും കാണിക്കുന്ന പുതിയ സെക്ഷൻ (Real Feel ലുക്ക്) */}
            <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-slate-800 dark:text-white text-base truncate">
                {item.title}
              </h3>

              {/* ഡേറ്റ് കാണിക്കുന്ന ഭാഗം */}
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-1.5 font-medium">
                <Calendar size={13} className="text-indigo-500" />
                <span>
                  {new Date(item.date).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            {/* Category Badge */}
            <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full capitalize flex items-center gap-1">
              {item.category === "events" && <Calendar size={12} />}
              {item.category === "prayer" && <Church size={12} />}
              {item.category === "ministries" && <Users size={12} />}
              {item.category}
            </div>

            {/* Admin Action Buttons (Edit & Delete) */}
            {user?.isAdmin && (
              <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditClick(item.id);
                  }}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full shadow-lg transition"
                  aria-label="Edit"
                >
                  <Edit size={14} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClick(item.id);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition"
                  aria-label="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {filteredItems.length === 0 && (
        <div className="text-center py-20 text-slate-500 dark:text-slate-400">
          {selectedCategory === "all"
            ? "No images in the gallery yet. Check back soon!"
            : `No images found in the ${selectedCategory} category.`}
        </div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && filteredItems[currentIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 text-white hover:text-gray-300 transition z-10"
              aria-label="Close"
            >
              <X size={32} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition bg-black/30 rounded-full p-2"
              aria-label="Previous"
            >
              <ChevronLeft size={36} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition bg-black/30 rounded-full p-2"
              aria-label="Next"
            >
              <ChevronRight size={36} />
            </button>

            <div
              className="max-w-5xl max-h-[90vh] w-full mx-4 rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filteredItems[currentIndex].image}
                alt={filteredItems[currentIndex].title}
                className="w-full h-auto max-h-[80vh] object-contain bg-black"
              />
              <div className="bg-white/10 backdrop-blur-md p-4 text-white">
                <h3 className="text-xl font-bold">
                  {filteredItems[currentIndex].title}
                </h3>
                <p className="text-sm text-gray-200 mt-1">
                  {filteredItems[currentIndex].date}
                </p>
                <p className="text-gray-300 mt-2">
                  {filteredItems[currentIndex].description}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default Gallery;

// // src/pages/Gallery.jsx
// import React, { useState, useMemo } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import {
//   X,
//   ChevronLeft,
//   ChevronRight,
//   Image as ImageIcon,
//   Calendar,
//   Users,
//   Church,
//   PlusCircle,
//   Edit,
//   Trash2,
//   Loader2,
// } from "lucide-react";
// import { useAuth } from "../context/AuthContext";
// import {
//   useGetGalleryImagesQuery,
//   useDeleteGalleryImageMutation,
// } from "../store/GalleryApi";

// // Delete Confirmation Modal Component
// const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, isDeleting }) => {
//   if (!isOpen) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//       <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-md mx-4 shadow-xl">
//         <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
//           Delete Image
//         </h3>
//         <p className="text-slate-600 dark:text-slate-300 mb-6">
//           Are you sure you want to delete this image? This action cannot be
//           undone.
//         </p>
//         <div className="flex justify-end gap-3">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-gray-300 dark:hover:bg-slate-600 transition"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onConfirm}
//             disabled={isDeleting}
//             className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition disabled:opacity-50 flex items-center gap-2"
//           >
//             {isDeleting ? (
//               <Loader2 size={16} className="animate-spin" />
//             ) : (
//               <Trash2 size={16} />
//             )}
//             {isDeleting ? "Deleting..." : "Delete"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Gallery = () => {
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [lightboxOpen, setLightboxOpen] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [deleteModalOpen, setDeleteModalOpen] = useState(false);
//   const [selectedImageId, setSelectedImageId] = useState(null);
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const {
//     data: response,
//     isLoading,
//     isError,
//     refetch,
//   } = useGetGalleryImagesQuery();
//   console.log("response", response);
//   console.log("isLoading", isLoading);
//   const [deleteGalleryImage, { isLoading: isDeleting }] =
//     useDeleteGalleryImageMutation();

//   // Extract gallery items from API response
//   const galleryItems = useMemo(() => {
//     if (!response?.data) return [];
//     return response.data.map((item) => ({
//       id: item._id,
//       title: item.title,
//       category: item.category,
//       date: item.date,
//       description: item.description,
//       image: item.media?.[0]?.url || "",
//       orientation: "landscape",
//     }));
//   }, [response]);

//   // Categories for filtering
//   const categories = [
//     { id: "all", label: "All", icon: ImageIcon },
//     { id: "events", label: "Events", icon: Calendar },
//     { id: "prayer", label: "Prayer Meetings", icon: Church },
//     { id: "ministries", label: "Ministries", icon: Users },
//   ];

//   // Filter items based on selected category
//   const filteredItems = useMemo(() => {
//     if (selectedCategory === "all") return galleryItems;
//     return galleryItems.filter((item) => item.category === selectedCategory);
//   }, [galleryItems, selectedCategory]);

//   // Lightbox handlers
//   const openLightbox = (index) => {
//     setCurrentIndex(index);
//     setLightboxOpen(true);
//     document.body.style.overflow = "hidden";
//   };

//   const closeLightbox = () => {
//     setLightboxOpen(false);
//     document.body.style.overflow = "auto";
//   };

//   const nextImage = () => {
//     setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
//   };

//   const prevImage = () => {
//     setCurrentIndex(
//       (prev) => (prev - 1 + filteredItems.length) % filteredItems.length,
//     );
//   };

//   // Delete handler
//   const handleDeleteClick = (id) => {
//     setSelectedImageId(id);
//     setDeleteModalOpen(true);
//   };

//   const confirmDelete = async () => {
//     try {
//       await deleteGalleryImage(selectedImageId).unwrap();
//       toast.success("Image deleted successfully!");
//       setDeleteModalOpen(false);
//       setSelectedImageId(null);
//       refetch(); // Refresh the list
//     } catch (err) {
//       toast.error(err.data?.message || "Failed to delete image");
//     }
//   };

//   // Edit handler
//   const handleEditClick = (id) => {
//     navigate(`/gallery/edit/${id}`);
//   };

//   // Keyboard navigation for lightbox
//   React.useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (!lightboxOpen) return;
//       if (e.key === "ArrowRight") nextImage();
//       if (e.key === "ArrowLeft") prevImage();
//       if (e.key === "Escape") closeLightbox();
//     };
//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [lightboxOpen, currentIndex]);

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 20 } },
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <Loader2 className="animate-spin w-12 h-12 text-indigo-600" />
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center text-red-600">
//           <p>Failed to load gallery images. Please try again later.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white dark:bg-slate-950 transition-colors duration-500 min-h-screen">
//       {/* Hero Header */}
//       <section className="relative py-20 px-6 text-center overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-transparent dark:from-indigo-950/20" />
//         <div className="relative max-w-3xl mx-auto">
//           <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white">
//             Our Ministry Gallery
//           </h1>
//           <p className="text-lg text-slate-600 dark:text-slate-300 mt-4">
//             Capturing moments of worship, fellowship, and outreach – visual
//             testimonies of God's faithfulness.
//           </p>
//         </div>
//       </section>

//       {/* Admin Action Buttons */}
//       {user?.isAdmin && (
//         <div className="max-w-7xl mx-auto px-6 mb-4 flex justify-end gap-3">
//           <Link
//             to="/gallery/create"
//             className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-full shadow-md transition"
//           >
//             <PlusCircle size={18} />
//             Add New Image
//           </Link>
//         </div>
//       )}

//       {/* Category Filter */}
//       <div className="max-w-7xl mx-auto px-6 pb-8">
//         <div className="flex flex-wrap justify-center gap-3">
//           {categories.map((cat) => (
//             <button
//               key={cat.id}
//               onClick={() => setSelectedCategory(cat.id)}
//               className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
//                 selectedCategory === cat.id
//                   ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
//                   : "bg-white/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/40"
//               }`}
//             >
//               <cat.icon size={16} />
//               {cat.label}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Gallery Grid */}
//       <motion.div
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//         className="max-w-7xl mx-auto px-6 pb-20"
//       >
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-min gap-6">
//           {filteredItems.map((item, idx) => (
//             <motion.div
//               key={item.id}
//               variants={itemVariants}
//               whileHover={{ y: -5 }}
//               className="group relative rounded-2xl overflow-hidden shadow-lg cursor-pointer"
//               onClick={() => openLightbox(idx)}
//             >
//               <div className="relative aspect-w-4 aspect-h-3 overflow-hidden bg-slate-200 dark:bg-slate-800">
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
//                   <div className="text-white">
//                     <h3 className="font-bold text-lg">{item.title}</h3>
//                     <p className="text-sm text-gray-200">{item.date}</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Category Badge */}
//               <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
//                 {item.category === "events" && (
//                   <Calendar size={12} className="inline mr-1" />
//                 )}
//                 {item.category === "prayer" && (
//                   <Church size={12} className="inline mr-1" />
//                 )}
//                 {item.category === "ministries" && (
//                   <Users size={12} className="inline mr-1" />
//                 )}
//                 {item.category}
//               </div>

//               {/* Admin Action Buttons (Edit & Delete) */}
//               {user?.isAdmin && (
//                 <div className="absolute top-3 right-3 flex gap-2">
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleEditClick(item.id);
//                     }}
//                     className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full shadow-lg transition"
//                     aria-label="Edit"
//                   >
//                     <Edit size={14} />
//                   </button>
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleDeleteClick(item.id);
//                     }}
//                     className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition"
//                     aria-label="Delete"
//                   >
//                     <Trash2 size={14} />
//                   </button>
//                 </div>
//               )}
//             </motion.div>
//           ))}
//         </div>

//         {filteredItems.length === 0 && (
//           <div className="text-center py-20 text-slate-500 dark:text-slate-400">
//             {selectedCategory === "all"
//               ? "No images in the gallery yet. Check back soon!"
//               : `No images found in the ${selectedCategory} category.`}
//           </div>
//         )}
//       </motion.div>

//       {/* Lightbox Modal */}
//       <AnimatePresence>
//         {lightboxOpen && filteredItems[currentIndex] && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center"
//             onClick={closeLightbox}
//           >
//             <button
//               onClick={closeLightbox}
//               className="absolute top-5 right-5 text-white hover:text-gray-300 transition z-10"
//               aria-label="Close"
//             >
//               <X size={32} />
//             </button>
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 prevImage();
//               }}
//               className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition bg-black/30 rounded-full p-2"
//               aria-label="Previous"
//             >
//               <ChevronLeft size={36} />
//             </button>
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 nextImage();
//               }}
//               className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition bg-black/30 rounded-full p-2"
//               aria-label="Next"
//             >
//               <ChevronRight size={36} />
//             </button>

//             <div
//               className="max-w-5xl max-h-[90vh] w-full mx-4 rounded-2xl overflow-hidden shadow-2xl"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <img
//                 src={filteredItems[currentIndex].image}
//                 alt={filteredItems[currentIndex].title}
//                 className="w-full h-auto max-h-[80vh] object-contain bg-black"
//               />
//               <div className="bg-white/10 backdrop-blur-md p-4 text-white">
//                 <h3 className="text-xl font-bold">
//                   {filteredItems[currentIndex].title}
//                 </h3>
//                 <p className="text-sm text-gray-200 mt-1">
//                   {filteredItems[currentIndex].date}
//                 </p>
//                 <p className="text-gray-300 mt-2">
//                   {filteredItems[currentIndex].description}
//                 </p>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Delete Confirmation Modal */}
//       <DeleteConfirmModal
//         isOpen={deleteModalOpen}
//         onClose={() => setDeleteModalOpen(false)}
//         onConfirm={confirmDelete}
//         isDeleting={isDeleting}
//       />
//     </div>
//   );
// };

// export default Gallery;
