export interface Post {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

export interface PostsState {
    posts: Post[];
    loading: boolean;
    error: string | null;
}

export interface PostPayload {
    userId: number;
    id: number;
    title: string;
    completed?: boolean;
}

export interface Notification {
    msg: string;
    color: string;
}