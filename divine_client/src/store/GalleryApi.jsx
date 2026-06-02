// src/store/galleryApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const galleryApi = createApi({
  reducerPath: "galleryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/v1/gallery`,
    prepareHeaders: (headers, { getState }) => {
      const token =
        getState().auth?.user?.token || localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Gallery"],
  endpoints: (builder) => ({
    // Get all gallery images
    getGalleryImages: builder.query({
      query: () => "/",
      // ബാക്കെൻഡിൽ നിന്ന് വരുന്ന `result.data` (Array) ഉപയോഗിച്ച് ടാഗ് ചെയ്യുന്നു
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ _id }) => ({ type: "Gallery", id: _id })),
              { type: "Gallery", id: "LIST" },
            ]
          : [{ type: "Gallery", id: "LIST" }],
    }),

    // Get a single gallery image by ID
    getGalleryImageById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Gallery", id }],
    }),

    // Upload new gallery image
    createGalleryImage: builder.mutation({
      query: (formData) => ({
        url: "/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Gallery", id: "LIST" }],
    }),

    // Update gallery image
    updateGalleryImage: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Gallery", id },
        { type: "Gallery", id: "LIST" },
      ],
    }),

    // Delete gallery image
    deleteGalleryImage: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Gallery", id },
        { type: "Gallery", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetGalleryImagesQuery,
  useGetGalleryImageByIdQuery,
  useCreateGalleryImageMutation,
  useUpdateGalleryImageMutation,
  useDeleteGalleryImageMutation,
} = galleryApi;
