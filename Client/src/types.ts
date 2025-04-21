export interface Comment {
  content: string;
}

export interface Post {
  _id: string;
  title: string;
  content: string;
  comments: Comment[];
}

export interface PostResponse {
  post: Post;
}

interface Room {
  _id: string;
  name: string;
  currentUsers: number;
  maxUsers: number;
  available: boolean;
  availableUntil?: string; // ISO string for availability expiration
  backgroundUrl: string; // URL for the room's background image
}

