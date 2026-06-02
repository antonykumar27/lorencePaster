import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/v1/users`,
    prepareHeaders: (headers, { getState }) => {
      // ലോക്കൽ സ്റ്റോറേജിൽ നിന്നോ റെഡക്സ് സ്റ്റേറ്റിൽ നിന്നോ അഡ്മിൻ ടോക്കൺ എടുക്കുന്നു
      const token =
        getState().auth?.user?.token || localStorage.getItem("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Admin", "Prayer", "Program", "Gallery"],
  endpoints: (builder) => ({
    // ==========================================
    // 🔐 👑 ADMIN AUTH & PROFILE ENDPOINTS
    // ==========================================

    // അഡ്മിൻ രജിസ്ട്രേഷൻ
    registerAdmin: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Admin"],
    }),

    // അഡ്മിൻ ലോഗിൻ
    loginAdmin: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Admin"],
    }),

    // അഡ്മിൻ പ്രൊഫൈൽ വിവരങ്ങൾ അപ്ഡേറ്റ് ചെയ്യാൻ (Password, Name, Email)
    updateAdminProfile: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Admin"],
    }),

    // ==========================================
    // 🙏 PRAYER REQUESTS ENDPOINTS
    // ==========================================
    createPrayerRequest: builder.mutation({
      query: (data) => ({
        url: "/prayer-request",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Prayer", id: "LIST" }],
    }),

    getPrayerRequests: builder.query({
      query: () => "/prayer-requests",
      providesTags: [{ type: "Prayer", id: "LIST" }],
    }),

    // ==========================================
    // 📅 DIVINE PROGRAMS & GALLERY ENDPOINTS
    // ==========================================
    getDivinePrograms: builder.query({
      query: () => "/programs",
      providesTags: [{ type: "Program", id: "LIST" }],
    }),

    getGalleryImages: builder.query({
      query: () => "/gallery",
      providesTags: [{ type: "Gallery", id: "LIST" }],
    }),
    checkEmail: builder.query({
      query: (email) => ({
        url: "/check-email",
        method: "POST",
        body: { email },
      }),
    }),
    // ==========================================
    // ☁️ UTILITIES
    // ==========================================
    getCloudinary: builder.query({
      query: () => "/cloudinary-signature",
    }),
  }),
});

export const {
  // Admin Auth Hooks
  useRegisterAdminMutation,
  useLoginAdminMutation,
  useUpdateAdminProfileMutation,

  // Divine Ministries Services Hooks
  useCreatePrayerRequestMutation,
  useGetPrayerRequestsQuery,
  useGetDivineProgramsQuery,
  useGetGalleryImagesQuery,
  useLazyCheckEmailQuery,
  // Cloudinary Utility
  useGetCloudinaryQuery,
} = userApi;
