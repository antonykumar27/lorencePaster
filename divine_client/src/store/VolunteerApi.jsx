// src/store/volunteerApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const volunteerApi = createApi({
  reducerPath: "volunteerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/v1/volunteers`,
    prepareHeaders: (headers, { getState }) => {
      // Auth സ്റ്റേറ്റിൽ നിന്നോ localstorage-ൽ നിന്നോ ടോക്കൺ എടുക്കുന്നു
      const token =
        getState().auth?.user?.token || localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Volunteer", "Help"],
  endpoints: (builder) => ({
    // 1. Get all volunteer applications (Admin-ന് മാത്രം കാണാൻ)
    getVolunteers: builder.query({
      query: () => "/",
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ _id }) => ({ type: "Volunteer", id: _id })),
              { type: "Volunteer", id: "LIST" },
            ]
          : [{ type: "Volunteer", id: "LIST" }],
    }),

    // 2. Submit a new volunteer application (യൂസർമാർക്ക് അപേക്ഷിക്കാൻ)
    createVolunteer: builder.mutation({
      query: (volunteerData) => ({
        url: "/",
        method: "POST",
        body: volunteerData, // സാധാരണ JSON ഒബ്‌ജക്റ്റ് ആയിട്ടാണ് ഡാറ്റ വിടുന്നത് (FormData ആവശ്യമില്ലെങ്കിൽ)
      }),
      // പുതിയൊരു അപേക്ഷ വരുമ്പോൾ അഡ്മിൻ പാനലിലെ ലിസ്റ്റ് ഓട്ടോമാറ്റിക്കായി റിഫ്രഷ് ആകാൻ
      invalidatesTags: [{ type: "Volunteer", id: "LIST" }],
    }),

    // 3. Update volunteer status (Pending -> Approved/Rejected - Admin-ന് വേണ്ടി)
    updateVolunteerStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/${id}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Volunteer", id },
        { type: "Volunteer", id: "LIST" },
      ],
    }),

    // 4. Delete a volunteer application (Admin-ന് വേണ്ടി)
    deleteVolunteer: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Volunteer", id },
        { type: "Volunteer", id: "LIST" },
      ],
    }),
    // 1. Submit a new help request (സഹായം ചോദിക്കാൻ - യൂസർമാർക്ക്)
    createHelpRequest: builder.mutation({
      query: (helpData) => ({
        url: "/helps", // നിങ്ങളുടെ ബാക്കെൻഡ് റൂട്ട് അനുസരിച്ച് മാറ്റാം
        method: "POST",
        body: helpData,
      }),
      invalidatesTags: [{ type: "Help", id: "LIST" }],
    }),

    // 2. Get all help requests (അഡ്മിന് കാണാൻ)
    getHelpRequests: builder.query({
      query: () => "/helps",
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ _id }) => ({ type: "Help", id: _id })),
              { type: "Help", id: "LIST" },
            ]
          : [{ type: "Help", id: "LIST" }],
    }),

    // 3. Update help request status (Pending -> Approved/Rejected/Resolved)
    updateHelpStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/helps/${id}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Help", id },
        { type: "Help", id: "LIST" },
      ],
    }),
    deleteHelpRequest: builder.mutation({
      query: (id) => ({
        url: `/admin/help-requests/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["HelpRequest"],
    }),
  }),
});

export const {
  useGetVolunteersQuery,
  useCreateVolunteerMutation,
  useUpdateVolunteerStatusMutation,
  useDeleteVolunteerMutation,
  useCreateHelpRequestMutation, // 👈 പുതിയ ഹുക്ക്
  useGetHelpRequestsQuery, // 👈 പുതിയ ഹുക്ക്
  useUpdateHelpStatusMutation, // 👈 പുതിയ ഹുക്ക്
  useDeleteHelpRequestMutation,
} = volunteerApi;
