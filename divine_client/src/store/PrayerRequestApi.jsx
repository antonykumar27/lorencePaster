import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const prayerRequestApi = createApi({
  reducerPath: "prayerRequestApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/v1/prayer`,
    prepareHeaders: (headers, { getState }) => {
      const token =
        getState().auth?.user?.token || localStorage.getItem("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "User",
    "Prayer",
    "PrayerRequest",
    "Program",
    "Gallery",
    "Donation",
  ],
  endpoints: (builder) => ({
    // ==========================================
    // 🔐 AUTH & USER ENDPOINTS
    // ==========================================
    getUsers: builder.query({
      query: () => `/`,
      providesTags: [{ type: "User", id: "LIST" }],
    }),

    getUserById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),

    createUser: builder.mutation({
      query: (data) => ({
        url: `/register`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),

    checkEmail: builder.query({
      query: (email) => ({
        url: "/check-email",
        method: "POST",
        body: { email },
      }),
    }),

    loginUser: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    updateUser: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "User", id },
        { type: "User", id: "LIST" },
      ],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),

    // ==========================================
    // 🙏 PRAYER REQUESTS ENDPOINTS (NEW)
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
      providesTags: [{ type: "PrayerRequest", id: "LIST" }], // "Prayer" എന്നത് മാറ്റി "PrayerRequest" ആക്കി
    }),

    // ==========================================
    // 📅 DIVINE PROGRAMS & GALLERY ENDPOINTS (NEW)
    // ==========================================
    getDivinePrograms: builder.query({
      query: () => "/programs",
      providesTags: [{ type: "Program", id: "LIST" }],
    }),

    getGalleryImages: builder.query({
      query: () => "/gallery",
      providesTags: [{ type: "Gallery", id: "LIST" }],
    }),

    // ==========================================
    // 💳 DONATIONS & UTILITIES
    // ==========================================
    createDonation: builder.mutation({
      query: (data) => ({
        url: "/donate",
        method: "POST",
        body: data,
      }),
    }),

    // 💡 Razorpay സിഗ്നേച്ചർ വെരിഫൈ ചെയ്യാനുള്ള പുതിയ എൻഡ്പോയിന്റ്
    verifyDonation: builder.mutation({
      query: (data) => ({
        url: "/verify",
        method: "POST",
        body: data,
      }),
    }),

    getCloudinary: builder.query({
      query: () => "/cloudinary-signature",
    }),
    // store/userApi.js-ന്റെ ഒടുവിൽ (createDonation-ന് താഴെ) ചേർക്കുക:
    getDonationHistory: builder.query({
      query: () => "/donations", // ബാക്ക്എൻഡ് റൂട്ട് അനുസരിച്ച് മാറ്റുക
      providesTags: [{ type: "Donation", id: "LIST" }],
    }),
    updatePrayerRequest: builder.mutation({
      query: ({ id, status }) => ({
        url: `/prayer-request/${id}`, // ശ്രദ്ധിക്കുക: URL-ൽ '/prayer-request/' എന്ന് കൃത്യമായി നൽകുക
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "PrayerRequest", id },
        { type: "PrayerRequest", id: "LIST" }, // ഇത് കൊടുത്താൽ മാത്രമേ ലിസ്റ്റ് പേജിൽ മാറ്റം കാണിക്കൂ
      ],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetCloudinaryQuery,
  useLazyGetCloudinaryQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useLazyCheckEmailQuery,
  useLoginUserMutation,

  // New Divine Ministries Hooks
  useCreatePrayerRequestMutation,
  useGetPrayerRequestsQuery,
  useGetDivineProgramsQuery,
  useGetGalleryImagesQuery,
  useCreateDonationMutation,
  useUpdatePrayerRequestMutation,

  // 💡 എക്സ്പോർട്ട് ചെയ്ത പുതിയ വെരിഫിക്കേഷൻ ഹുക്ക്!
  useVerifyDonationMutation,
  useGetDonationHistoryQuery,
} = prayerRequestApi;
