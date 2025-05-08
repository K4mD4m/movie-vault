import { db } from "./config";
import {
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  collection,
  getDocs,
} from "firebase/firestore";

// Interface for user rating
export interface UserRating {
  movieId: number;
  rating: number;
  timestamp?: Date;
}

// Save user rating for a movie
export const saveUserRating = async (
  userId: string,
  movieId: number,
  rating: number
): Promise<void> => {
  const ratingRef = doc(db, "userRatings", userId, "ratings", movieId.toString());
  await setDoc(ratingRef, {
    movieId,
    rating,
    timestamp: new Date(),
  });
};

// Get user rating for a specific movie
export const getUserRating = async (
  userId: string,
  movieId: number
): Promise<UserRating | null> => {
  const ratingRef = doc(db, "userRatings", userId, "ratings", movieId.toString());
  const docSnap = await getDoc(ratingRef);
  return docSnap.exists() ? (docSnap.data() as UserRating) : null;
};

// Delete user rating for a movie
export const deleteUserRating = async (
  userId: string,
  movieId: number
): Promise<void> => {
  const ratingRef = doc(db, "userRatings", userId, "ratings", movieId.toString());
  await deleteDoc(ratingRef);
};

// Get all user ratings
export const getAllUserRatings = async (
  userId: string
): Promise<UserRating[]> => {
  const ratingsCollection = collection(db, "userRatings", userId, "ratings");
  const snapshot = await getDocs(ratingsCollection);

  return snapshot.docs.map((doc) => {
    const data = doc.data() as Omit<UserRating, "movieId">;
    return {
      ...data,
      movieId: parseInt(doc.id),
    };
  });
};