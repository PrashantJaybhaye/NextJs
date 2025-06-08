interface Book {
    id: number;
    title: string;
    author: string;
    genre: string;
    rating: number;
    totalCopies: number;
    availableCopies: number;
    description: string;
    color: string;
    cover: string;
    video: string;
    summary: string;
    isLoandedBook?: boolean;
}