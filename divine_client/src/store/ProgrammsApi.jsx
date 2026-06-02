// src/store/programApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const programApi = createApi({
  reducerPath: "programApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/v1/programs`,
    prepareHeaders: (headers, { getState }) => {
      const token =
        getState().auth?.user?.token || localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Program"],
  endpoints: (builder) => ({
    // 📋 GET all programs (upcoming + past combined)
    getAllPrograms: builder.query({
      query: () => "/",
      providesTags: ["Program"],
    }),

    // 🔍 GET a single program by ID
    getProgramById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Program", id }],
    }),

    // 👥 GET joined and liked users list for a single program (One URL)
    // ഇത് ബാക്കെൻഡിൽ `/api/v1/programs/:id/attendees` എന്ന റൂട്ടിലേക്ക് ഹിറ്റ് ചെയ്യും
    getProgramAttendees: builder.query({
      query: (id) => `/${id}/attendees`,
      providesTags: (result, error, id) => [{ type: "Program", id }],
    }),

    // ➕ CREATE a new program (admin only)
    createProgram: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Program", id: "LIST" }],
    }),

    // ✏️ UPDATE a program (admin only)
    updateProgram: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Program", id },
        { type: "Program", id: "LIST" },
      ],
    }),

    // 🗑️ DELETE a program (admin only)
    deleteProgram: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Program", id: "LIST" }],
    }),

    // ❤️ Toggle Interest
    toggleInterest: builder.mutation({
      query: (id) => ({
        url: `/${id}/interest`, // ബേസ് യുആർഎൽ വെച്ച് കറക്റ്റ് ചെയ്തു
        method: "POST",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Program", id }],
    }),

    // 🎫 Toggle Join
    toggleJoin: builder.mutation({
      query: (id) => ({
        url: `/${id}/join`, // ബേസ് യുആർഎൽ വെച്ച് കറക്റ്റ് ചെയ്തു
        method: "POST",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Program", id }],
    }),
  }),
});

// Export hooks
export const {
  useGetAllProgramsQuery,
  useGetProgramByIdQuery,
  useGetProgramAttendeesQuery, // പുതിയ ഹുക്ക് ഇവിടെ എക്സ്പോർട്ട് ചെയ്തു
  useCreateProgramMutation,
  useUpdateProgramMutation,
  useDeleteProgramMutation,
  useToggleInterestMutation,
  useToggleJoinMutation,
} = programApi;
