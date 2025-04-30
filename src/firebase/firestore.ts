import { db } from "./config";
import { doc, setDoc, getDoc, deleteDoc, collection, getDocs } from "firebase/firestore";

export const saveUserRating = async (
    userId: string,
    movieId: number,
    rating: number
) => {
    const ratingRef = doc(db, "userRatings", userId, "ratings", movieId.toString());
    await setDoc(ratingRef, {
        movieId,
        rating,
        timestamp: new Date(),
    });
};

export const getUserRating = async (userId: string, movieId: number) => {
    const ratingRef = doc(db, "userRatings", userId, "ratings", movieId.toString());
    const docSnap = await getDoc(ratingRef);
    return docSnap.exists() ? docSnap.data() : null;
};

export const deleteUserRating = async (userId: string, movieId: number) => {
    const ratingRef = doc(db, "userRatings", userId, "ratings", movieId.toString());
    await deleteDoc(ratingRef);
};

export const getAllUserRatings = async (userId: string) => {
    const ratingsCollection = collection(db, "userRatings", userId, "ratings");
    const snapshot = await getDocs(ratingsCollection);
    return snapshot.docs.map((doc) => ({
        ...doc.data(),
        movieId: parseInt(doc.id),
    }));
}