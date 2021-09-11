export interface STORE_LAYOUT_SETTINGS {
  store_theme_color: string;
  header_type: "photo" | "video" | "slider";
  products_view: "bar" | "grid" | "list";
  photo_url: string | null;
  slider_photos: { id: number; url: string }[];
  video_url: string | null;
}
export interface UPDATE_STORE_LAYOUT {
  header_type: "photo" | "slider" | "video";
  photo_url: string | null;
  slider_photos: { id: number; url: string }[];
  video_url: string | null;
}
