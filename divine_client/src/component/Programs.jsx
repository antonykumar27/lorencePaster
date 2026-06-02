// src/pages/Programs.jsx
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Video,
  Users,
  TrendingUp,
  Heart,
  Sparkles,
  CheckCircle,
  PlusCircle,
  Loader2,
  Edit,
  Trash2,
  ThumbsUp,
  UserPlus,
  Eye,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import {
  useGetAllProgramsQuery,
  useDeleteProgramMutation,
  useToggleInterestMutation,
  useToggleJoinMutation,
} from "../store/ProgrammsApi";

// 1. EventCard Component
const EventCard = ({ event, isUpcoming, user, navigate }) => {
  const [deleteProgram, { isLoading: isDeleting }] = useDeleteProgramMutation();
  const [toggleInterest] = useToggleInterestMutation();
  const [toggleJoin] = useToggleJoinMutation();

  const [liked, setLiked] = useState(event.isInterestedByUser || false);
  const [joined, setJoined] = useState(event.isJoinedByUser || false);
  const [interestCount, setInterestCount] = useState(event.interestCount || 0);
  const [joinCount, setJoinCount] = useState(event.joinCount || 0);

  const getImageUrl = (program) => {
    if (program.media && program.media.length > 0 && program.media[0].url) {
      return program.media[0].url;
    }
    return "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=600&auto=format";
  };

  const imageUrl = getImageUrl(event);
  const mode = event.mode || "in-person";

  const formatDisplayDate = (dateStr) => {
    if (!dateStr) return "TBA";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDisplayTime = (timeStr) => {
    if (!timeStr) return "TBA";
    const [hours, minutes] = timeStr.split(":");
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const handleDelete = async () => {
    if (window.confirm("ഈ പ്രോഗ്രാം ഡിലീറ്റ് ചെയ്യണോ?")) {
      try {
        await deleteProgram(event._id).unwrap();
      } catch (err) {
        console.error("Delete failed", err);
      }
    }
  };

  const handleLike = async () => {
    if (!user) {
      toast.error("Please log in to access this resource");
      navigate("/login");
      return;
    }

    const newLiked = !liked;
    const newCount = newLiked ? interestCount + 1 : interestCount - 1;
    setLiked(newLiked);
    setInterestCount(newCount);
    try {
      const res = await toggleInterest(event._id).unwrap();
      setLiked(res.interested);
      setInterestCount(res.interestCount);
    } catch (err) {
      setLiked(!newLiked);
      setInterestCount(interestCount);
      console.error("Like toggle failed", err);
    }
  };

  const handleJoin = async () => {
    if (!user) {
      toast.error("Please log in to access this resource");
      navigate("/login");
      return;
    }

    const newJoined = !joined;
    const newJoinCount = newJoined ? joinCount + 1 : joinCount - 1;
    setJoined(newJoined);
    setJoinCount(newJoinCount);
    try {
      const res = await toggleJoin(event._id).unwrap();
      setJoined(res.joined);
      setJoinCount(res.joinCount);
    } catch (err) {
      setJoined(!newJoined);
      setJoinCount(joinCount);
      console.error("Join toggle failed", err);
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -5, scale: 1.01 }}
      className="group bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 relative flex flex-col h-full"
    >
      {/* Delete button - admin only */}
      {user?.isAdmin && (
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="absolute top-3 left-3 z-10 bg-red-100 dark:bg-red-900/70 p-2 rounded-full shadow-md hover:bg-red-200 transition disabled:opacity-50"
          title="Delete Event"
        >
          <Trash2 size={16} className="text-red-600 dark:text-red-300" />
        </button>
      )}

      {/* Edit button - admin only */}
      {user?.isAdmin && (
        <Link
          to={`/programs/edit/${event._id}`}
          className="absolute top-3 right-3 z-10 bg-white/90 dark:bg-slate-900/90 p-2 rounded-full shadow-md hover:bg-indigo-50 dark:hover:bg-slate-800 transition-colors"
          title="Edit Event"
        >
          <Edit size={16} className="text-indigo-600 dark:text-indigo-400" />
        </Link>
      )}

      {/* Image section */}
      <div className="relative h-48 overflow-hidden shrink-0">
        <img
          src={imageUrl}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-3 flex gap-2">
          {mode === "online" && (
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <Video size={12} /> Online
            </span>
          )}
          {mode === "hybrid" && (
            <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <Users size={12} /> Hybrid
            </span>
          )}
          {mode === "in-person" && (
            <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <MapPin size={12} /> In‑person
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
            {event.title}
          </h3>
          <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-amber-500" />
              <span>{formatDisplayDate(event.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-amber-500" />
              <span>{formatDisplayTime(event.time)}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-amber-500" />
              <span>{event.location}</span>
            </div>
            {event.spiritualFocus && (
              <div className="flex items-start gap-2 mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                <Heart size={16} className="text-rose-500 mt-0.5" />
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {event.spiritualFocus}
                </span>
              </div>
            )}
          </div>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {event.description}
          </p>
        </div>

        <div>
          {/* Like & Join Buttons */}
          <div className="mt-5 flex flex-wrap gap-3 justify-between items-center">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition ${
                liked
                  ? "bg-rose-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-rose-100 dark:hover:bg-rose-900/40"
              }`}
            >
              <ThumbsUp size={14} />
              <span>{liked ? "Liked" : "Like"}</span>
              <span className="ml-1 text-xs bg-white/20 rounded-full px-1.5 py-0.5">
                {interestCount}
              </span>
            </button>

            <button
              onClick={handleJoin}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold transition ${
                joined
                  ? "bg-green-600 text-white"
                  : "bg-amber-600 text-white hover:bg-amber-700"
              }`}
            >
              <UserPlus size={14} />
              <span>{joined ? "Joined ✓" : "Join This Program"}</span>
              <span className="ml-1 text-xs bg-white/20 rounded-full px-1.5 py-0.5">
                {joinCount}
              </span>
            </button>
          </div>

          {/* 2. അഡ്മിന് കാണാനുള്ള റീഡയറക്ട് ലിങ്ക് ഇവിടെ സെറ്റ് ചെയ്തു */}
          {user?.isAdmin && (
            <Link
              to={`/viewAttenderslist/${event._id}`}
              className="mt-4 w-full py-2 bg-slate-100 hover:bg-indigo-50 dark:bg-slate-700/50 dark:hover:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 border border-dashed border-slate-300 dark:border-slate-600 hover:border-indigo-400 dark:hover:border-indigo-800 transition"
            >
              <Eye size={14} /> View Attendees Details
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// 3. Main Programs Component
const Programs = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useGetAllProgramsQuery();

  const allPrograms = response?.data || [];

  const { upcomingEvents, pastEvents } = useMemo(() => {
    const upcoming = allPrograms.filter((p) => !p.isPast);
    const past = allPrograms.filter((p) => p.isPast);
    return { upcomingEvents: upcoming, pastEvents: past };
  }, [allPrograms]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
        <Loader2 className="animate-spin w-12 h-12 text-indigo-600" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
        <div className="text-center text-red-600">
          <p>Failed to load programs. Please try again later.</p>
          <p className="text-sm text-gray-500">{error?.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-500 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-transparent dark:from-indigo-950/20" />
        <div className="relative max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-4 border border-indigo-200 dark:border-indigo-800">
            <Sparkles size={14} /> Join Our Spiritual Journey
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white">
            Programs & Events
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 mt-4 max-w-2xl mx-auto">
            Discover upcoming and past gatherings that will deepen your faith,
            connect you with community, and bring spiritual transformation.
          </p>
        </div>
      </section>

      {/* Admin Create Button */}
      {user?.isAdmin && (
        <div className="max-w-7xl mx-auto px-6 mb-4 flex justify-end">
          <Link
            to="/programs/create"
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-full shadow-md transition"
          >
            <PlusCircle size={18} />
            Create New Event
          </Link>
        </div>
      )}

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-6 pb-6">
        <div className="flex justify-center gap-4 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`pb-3 px-6 font-semibold transition-all relative ${
              activeTab === "upcoming"
                ? "text-amber-600 dark:text-amber-400"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700"
            }`}
          >
            Upcoming Events
            {activeTab === "upcoming" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`pb-3 px-6 font-semibold transition-all relative ${
              activeTab === "past"
                ? "text-amber-600 dark:text-amber-400"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700"
            }`}
          >
            Past Events
            {activeTab === "past" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full"
              />
            )}
          </button>
        </div>
      </div>

      {/* Event Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {activeTab === "upcoming" && (
            <motion.div
              key="upcoming"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid md:grid-cols-2 lg:grid-cols-2 gap-8"
              >
                {upcomingEvents.map((event) => (
                  <EventCard
                    key={event._id}
                    event={event}
                    isUpcoming={true}
                    user={user}
                    navigate={navigate}
                  />
                ))}
              </motion.div>
            </motion.div>
          )}

          {activeTab === "past" && (
            <motion.div
              key="past"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {pastEvents.map((event) => (
                  <EventCard
                    key={event._id}
                    event={event}
                    isUpcoming={false}
                    user={user}
                    navigate={navigate}
                  />
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {activeTab === "upcoming" && upcomingEvents.length === 0 && (
          <div className="text-center py-20 text-slate-500 dark:text-slate-400">
            No upcoming events at the moment. Check back soon!
          </div>
        )}
        {activeTab === "past" && pastEvents.length === 0 && (
          <div className="text-center py-20 text-slate-500 dark:text-slate-400">
            No past events recorded yet.
          </div>
        )}
      </div>

      {/* How to Participate CTA */}
      <section className="py-16 px-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
            How to Participate?
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white/60 dark:bg-slate-800/40 backdrop-blur-sm rounded-xl p-5">
              <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-3" />
              <h3 className="font-bold">In‑Person</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Join us at our sanctuary. All are welcome!
              </p>
            </div>
            <div className="bg-white/60 dark:bg-slate-800/40 backdrop-blur-sm rounded-xl p-5">
              <Video className="w-10 h-10 text-blue-500 mx-auto mb-3" />
              <h3 className="font-bold">Online (Live)</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Watch via YouTube, Facebook, or Zoom.
              </p>
            </div>
            <div className="bg-white/60 dark:bg-slate-800/40 backdrop-blur-sm rounded-xl p-5">
              <TrendingUp className="w-10 h-10 text-amber-500 mx-auto mb-3" />
              <h3 className="font-bold">Pray & Support</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Partner with us in prayer and financial support.
              </p>
            </div>
          </div>
          <p className="mt-8 text-slate-600 dark:text-slate-300">
            For detailed schedules or group registrations,{" "}
            <Link
              to="/contact"
              className="text-amber-600 font-semibold underline"
            >
              contact our office
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
};

export default Programs;

// // src/pages/Programs.jsx
// import React, { useState, useMemo } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Calendar,
//   Clock,
//   MapPin,
//   Video,
//   Users,
//   TrendingUp,
//   Heart,
//   Sparkles,
//   CheckCircle,
//   ArrowRight,
//   PlusCircle,
//   Loader2,
//   Edit,
//   Trash2,
//   ThumbsUp,
//   UserPlus,
// } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom"; // 1. useNavigate ഇവിടെ ആഡ് ചെയ്തു
// import { toast } from "react-toastify"; // ടോസ്റ്റ് മെസ്സേജ് കാണിക്കാൻ (ഇല്ലെങ്കിൽ ഇൻസ്റ്റാൾ ചെയ്യുക അല്ലെങ്കിൽ നോർമൽ അലർട്ട് മാറ്റാം)
// import { useAuth } from "../context/AuthContext";
// import {
//   useGetAllProgramsQuery,
//   useDeleteProgramMutation,
//   useToggleInterestMutation,
//   useToggleJoinMutation,
// } from "../store/ProgrammsApi";

// // 3. EventCard-ലേക്ക് പ്രോപ്പ് ആയി navigate പാസ് ചെയ്യുന്നു
// const EventCard = ({ event, isUpcoming, user, navigate }) => {
//   const [deleteProgram, { isLoading: isDeleting }] = useDeleteProgramMutation();
//   const [toggleInterest] = useToggleInterestMutation();
//   const [toggleJoin] = useToggleJoinMutation();

//   // Local state for optimistic updates
//   const [liked, setLiked] = useState(event.isInterestedByUser || false);
//   const [joined, setJoined] = useState(event.isJoinedByUser || false);
//   const [interestCount, setInterestCount] = useState(event.interestCount || 0);
//   const [joinCount, setJoinCount] = useState(event.joinCount || 0);

//   const getImageUrl = (program) => {
//     if (program.media && program.media.length > 0 && program.media[0].url) {
//       return program.media[0].url;
//     }
//     return "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=600&auto=format";
//   };

//   const imageUrl = getImageUrl(event);
//   const mode = event.mode || "in-person";

//   const formatDisplayDate = (dateStr) => {
//     if (!dateStr) return "TBA";
//     const date = new Date(dateStr);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   const formatDisplayTime = (timeStr) => {
//     if (!timeStr) return "TBA";
//     const [hours, minutes] = timeStr.split(":");
//     const h = parseInt(hours, 10);
//     const ampm = h >= 12 ? "PM" : "AM";
//     const hour12 = h % 12 || 12;
//     return `${hour12}:${minutes} ${ampm}`;
//   };

//   const handleDelete = async () => {
//     if (window.confirm("ഈ പ്രോഗ്രാം ഡിലീറ്റ് ചെയ്യണോ?")) {
//       try {
//         await deleteProgram(event._id).unwrap();
//         // നോട്ട്: കറന്റ് കമ്പോണന്റിൽ റെഫെച്ച് ചെയ്യണമെങ്കിൽ പ്രോപ്പായി പാസ് ചെയ്യണം
//       } catch (err) {
//         console.error("Delete failed", err);
//       }
//     }
//   };

//   const handleLike = async () => {
//     // 4. യൂസർ ലോഗിൻ ചെയ്തിട്ടില്ലെങ്കിൽ ലോഗിൻ പേജിലേക്ക് വിടുന്നു
//     if (!user) {
//       toast.error("Please log in to access this resource");
//       navigate("/admin-login"); // നിങ്ങളുടെ ലോഗിൻ റൂട്ട് ഏതാണോ അത് ഇവിടെ നൽകുക (ഉദാഹരണത്തിന്: '/auth' അല്ലെങ്കിൽ '/login')
//       return;
//     }

//     // Optimistic update
//     const newLiked = !liked;
//     const newCount = newLiked ? interestCount + 1 : interestCount - 1;
//     setLiked(newLiked);
//     setInterestCount(newCount);
//     try {
//       const res = await toggleInterest(event._id).unwrap();
//       setLiked(res.interested);
//       setInterestCount(res.interestCount);
//     } catch (err) {
//       setLiked(!newLiked);
//       setInterestCount(interestCount);
//       console.error("Like toggle failed", err);
//     }
//   };

//   const handleJoin = async () => {
//     // 4. യൂസർ ലോഗിൻ ചെയ്തിട്ടില്ലെങ്കിൽ ലോഗിൻ പേജിലേക്ക് വിടുന്നു
//     if (!user) {
//       toast.error("Please log in to access this resource");
//       navigate("/admin-login"); // നിങ്ങളുടെ ലോഗിൻ റൂട്ട് ഏതാണോ അത് നൽകുക
//       return;
//     }

//     const newJoined = !joined;
//     const newJoinCount = newJoined ? joinCount + 1 : joinCount - 1;
//     setJoined(newJoined);
//     setJoinCount(newJoinCount);
//     try {
//       const res = await toggleJoin(event._id).unwrap();
//       setJoined(res.joined);
//       setJoinCount(res.joinCount);
//     } catch (err) {
//       setJoined(!newJoined);
//       setJoinCount(joinCount);
//       console.error("Join toggle failed", err);
//     }
//   };

//   const fadeUp = {
//     hidden: { opacity: 0, y: 30 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
//   };

//   return (
//     <motion.div
//       variants={fadeUp}
//       whileHover={{ y: -5, scale: 1.01 }}
//       className="group bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 relative"
//     >
//       {/* Delete button - top left, admin only */}
//       {user?.isAdmin && (
//         <button
//           onClick={handleDelete}
//           disabled={isDeleting}
//           className="absolute top-3 left-3 z-10 bg-red-100 dark:bg-red-900/70 p-2 rounded-full shadow-md hover:bg-red-200 transition disabled:opacity-50"
//           title="Delete Event"
//         >
//           <Trash2 size={16} className="text-red-600 dark:text-red-300" />
//         </button>
//       )}

//       {/* Edit button - top right, admin only */}
//       {user?.isAdmin && (
//         <Link
//           to={`/programs/edit/${event._id}`}
//           className="absolute top-3 right-3 z-10 bg-white/90 dark:bg-slate-900/90 p-2 rounded-full shadow-md hover:bg-indigo-50 dark:hover:bg-slate-800 transition-colors"
//           title="Edit Event"
//         >
//           <Edit size={16} className="text-indigo-600 dark:text-indigo-400" />
//         </Link>
//       )}

//       {/* Image section */}
//       <div className="relative h-48 overflow-hidden">
//         <img
//           src={imageUrl}
//           alt={event.title}
//           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//         <div className="absolute bottom-3 left-3 flex gap-2">
//           {mode === "online" && (
//             <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
//               <Video size={12} /> Online
//             </span>
//           )}
//           {mode === "hybrid" && (
//             <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
//               <Users size={12} /> Hybrid
//             </span>
//           )}
//           {mode === "in-person" && (
//             <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
//               <MapPin size={12} /> In‑person
//             </span>
//           )}
//         </div>
//       </div>

//       {/* Content */}
//       <div className="p-5">
//         <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
//           {event.title}
//         </h3>
//         <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
//           <div className="flex items-center gap-2">
//             <Calendar size={16} className="text-amber-500" />
//             <span>{formatDisplayDate(event.date)}</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <Clock size={16} className="text-amber-500" />
//             <span>{formatDisplayTime(event.time)}</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <MapPin size={16} className="text-amber-500" />
//             <span>{event.location}</span>
//           </div>
//           {event.spiritualFocus && (
//             <div className="flex items-start gap-2 mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
//               <Heart size={16} className="text-rose-500 mt-0.5" />
//               <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
//                 {event.spiritualFocus}
//               </span>
//             </div>
//           )}
//         </div>
//         <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
//           {event.description}
//         </p>

//         {/* Like & Join Buttons */}
//         <div className="mt-5 flex flex-wrap gap-3 justify-between items-center">
//           <button
//             onClick={handleLike}
//             className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition ${
//               liked
//                 ? "bg-rose-500 text-white"
//                 : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-rose-100 dark:hover:bg-rose-900/40"
//             }`}
//           >
//             <ThumbsUp size={14} />
//             <span>{liked ? "Liked" : "Like"}</span>
//             <span className="ml-1 text-xs bg-white/20 rounded-full px-1.5 py-0.5">
//               {interestCount}
//             </span>
//           </button>

//           <button
//             onClick={handleJoin}
//             className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold transition ${
//               joined
//                 ? "bg-green-600 text-white"
//                 : "bg-amber-600 text-white hover:bg-amber-700"
//             }`}
//           >
//             <UserPlus size={14} />
//             <span>{joined ? "Joined ✓" : "Join This Program"}</span>
//             <span className="ml-1 text-xs bg-white/20 rounded-full px-1.5 py-0.5">
//               {joinCount}
//             </span>
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// const Programs = () => {
//   const [activeTab, setActiveTab] = useState("upcoming");
//   const { user } = useAuth();
//   const navigate = useNavigate(); // 2. useNavigate ഹുക്ക് ഇവിടെ ഡിക്ലെയർ ചെയ്തു

//   const {
//     data: response,
//     isLoading,
//     isError,
//     error,
//     refetch,
//   } = useGetAllProgramsQuery();

//   const allPrograms = response?.data || [];

//   const { upcomingEvents, pastEvents } = useMemo(() => {
//     const upcoming = allPrograms.filter((p) => !p.isPast);
//     const past = allPrograms.filter((p) => p.isPast);
//     return { upcomingEvents: upcoming, pastEvents: past };
//   }, [allPrograms]);

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
//         <Loader2 className="animate-spin w-12 h-12 text-indigo-600" />
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
//         <div className="text-center text-red-600">
//           <p>Failed to load programs. Please try again later.</p>
//           <p className="text-sm text-gray-500">{error?.message}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white dark:bg-slate-950 transition-colors duration-500 min-h-screen">
//       {/* Hero Section */}
//       <section className="relative py-20 px-6 text-center overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-transparent dark:from-indigo-950/20" />
//         <div className="relative max-w-3xl mx-auto">
//           <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-4 border border-indigo-200 dark:border-indigo-800">
//             <Sparkles size={14} /> Join Our Spiritual Journey
//           </span>
//           <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white">
//             Programs & Events
//           </h1>
//           <p className="text-lg text-slate-600 dark:text-slate-300 mt-4 max-w-2xl mx-auto">
//             Discover upcoming and past gatherings that will deepen your faith,
//             connect you with community, and bring spiritual transformation.
//           </p>
//         </div>
//       </section>

//       {/* Admin Create Button */}
//       {user?.isAdmin && (
//         <div className="max-w-7xl mx-auto px-6 mb-4 flex justify-end">
//           <Link
//             to="/programs/create"
//             className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-full shadow-md transition"
//           >
//             <PlusCircle size={18} />
//             Create New Event
//           </Link>
//         </div>
//       )}

//       {/* Tabs */}
//       <div className="max-w-7xl mx-auto px-6 pb-6">
//         <div className="flex justify-center gap-4 border-b border-gray-200 dark:border-gray-700">
//           <button
//             onClick={() => setActiveTab("upcoming")}
//             className={`pb-3 px-6 font-semibold transition-all relative ${
//               activeTab === "upcoming"
//                 ? "text-amber-600 dark:text-amber-400"
//                 : "text-slate-500 dark:text-slate-400 hover:text-slate-700"
//             }`}
//           >
//             Upcoming Events
//             {activeTab === "upcoming" && (
//               <motion.div
//                 layoutId="activeTab"
//                 className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full"
//               />
//             )}
//           </button>
//           <button
//             onClick={() => setActiveTab("past")}
//             className={`pb-3 px-6 font-semibold transition-all relative ${
//               activeTab === "past"
//                 ? "text-amber-600 dark:text-amber-400"
//                 : "text-slate-500 dark:text-slate-400 hover:text-slate-700"
//             }`}
//           >
//             Past Events
//             {activeTab === "past" && (
//               <motion.div
//                 layoutId="activeTab"
//                 className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full"
//               />
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Event Grid */}
//       <div className="max-w-7xl mx-auto px-6 py-12">
//         <AnimatePresence mode="wait">
//           {activeTab === "upcoming" && (
//             <motion.div
//               key="upcoming"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.3 }}
//             >
//               <motion.div
//                 variants={containerVariants}
//                 initial="hidden"
//                 animate="visible"
//                 className="grid md:grid-cols-2 lg:grid-cols-2 gap-8"
//               >
//                 {upcomingEvents.map((event) => (
//                   <EventCard
//                     key={event._id}
//                     event={event}
//                     isUpcoming={true}
//                     user={user}
//                     navigate={navigate} // പ്രോപ്പ് ആയി പാസ് ചെയ്യുന്നു
//                   />
//                 ))}
//               </motion.div>
//             </motion.div>
//           )}

//           {activeTab === "past" && (
//             <motion.div
//               key="past"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.3 }}
//             >
//               <motion.div
//                 variants={containerVariants}
//                 initial="hidden"
//                 animate="visible"
//                 className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
//               >
//                 {pastEvents.map((event) => (
//                   <EventCard
//                     key={event._id}
//                     event={event}
//                     isUpcoming={false}
//                     user={user}
//                     navigate={navigate} // പ്രോപ്പ് ആയി പാസ് ചെയ്യുന്നു
//                   />
//                 ))}
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {activeTab === "upcoming" && upcomingEvents.length === 0 && (
//           <div className="text-center py-20 text-slate-500 dark:text-slate-400">
//             No upcoming events at the moment. Check back soon!
//           </div>
//         )}
//         {activeTab === "past" && pastEvents.length === 0 && (
//           <div className="text-center py-20 text-slate-500 dark:text-slate-400">
//             No past events recorded yet.
//           </div>
//         )}
//       </div>

//       {/* How to Participate CTA */}
//       <section className="py-16 px-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30">
//         <div className="max-w-5xl mx-auto text-center">
//           <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
//             How to Participate?
//           </h2>
//           <div className="grid md:grid-cols-3 gap-6 mt-8">
//             <div className="bg-white/60 dark:bg-slate-800/40 backdrop-blur-sm rounded-xl p-5">
//               <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-3" />
//               <h3 className="font-bold">In‑Person</h3>
//               <p className="text-sm text-slate-600 dark:text-slate-300">
//                 Join us at our sanctuary. All are welcome!
//               </p>
//             </div>
//             <div className="bg-white/60 dark:bg-slate-800/40 backdrop-blur-sm rounded-xl p-5">
//               <Video className="w-10 h-10 text-blue-500 mx-auto mb-3" />
//               <h3 className="font-bold">Online (Live)</h3>
//               <p className="text-sm text-slate-600 dark:text-slate-300">
//                 Watch via YouTube, Facebook, or Zoom.
//               </p>
//             </div>
//             <div className="bg-white/60 dark:bg-slate-800/40 backdrop-blur-sm rounded-xl p-5">
//               <TrendingUp className="w-10 h-10 text-amber-500 mx-auto mb-3" />
//               <h3 className="font-bold">Pray & Support</h3>
//               <p className="text-sm text-slate-600 dark:text-slate-300">
//                 Partner with us in prayer and financial support.
//               </p>
//             </div>
//           </div>
//           <p className="mt-8 text-slate-600 dark:text-slate-300">
//             For detailed schedules or group registrations,{" "}
//             <Link
//               to="/contact"
//               className="text-amber-600 font-semibold underline"
//             >
//               contact our office
//             </Link>
//             .
//           </p>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Programs;
