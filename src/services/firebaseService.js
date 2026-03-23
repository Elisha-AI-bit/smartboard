import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy, 
  onSnapshot 
} from "firebase/firestore";
import { db } from "../firebase/config";

// --- Meetings Service ---

export const getMeetings = async () => {
  const querySnapshot = await getDocs(collection(db, "meetings"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const subscribeToMeetings = (callback) => {
  const q = query(collection(db, "meetings"), orderBy("date", "desc"));
  return onSnapshot(q, (snapshot) => {
    const meetings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(meetings);
  });
};

export const createMeeting = async (meetingData) => {
  const docRef = await addDoc(collection(db, "meetings"), {
    ...meetingData,
    createdAt: new Date().toISOString()
  });
  return docRef.id;
};

// --- Strategy Service ---

export const getObjectives = async () => {
  const querySnapshot = await getDocs(collection(db, "objectives"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const subscribeToObjectives = (callback) => {
  const q = query(collection(db, "objectives"), orderBy("progress", "desc"));
  return onSnapshot(q, (snapshot) => {
    const objectives = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(objectives);
  });
};

// --- Tasks Service ---

export const getTasks = async () => {
  const querySnapshot = await getDocs(collection(db, "tasks"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const subscribeToTasks = (callback) => {
  const q = query(collection(db, "tasks"), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(tasks);
  });
};

// --- Documents Service ---

export const getDocuments = async () => {
  const querySnapshot = await getDocs(collection(db, "documents"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const subscribeToDocuments = (callback) => {
  const q = query(collection(db, "documents"), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const documents = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(documents);
  });
};

// --- Voting Service ---

export const subscribeToBallots = (callback) => {
  const q = query(collection(db, "ballots"), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const ballots = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(ballots);
  });
};

export const castVote = async (ballotId, option) => {
  const ballotRef = doc(db, "ballots", ballotId);
  // In real case, we would increment values using fieldValue.increment
  // For demo/simplicity now, we just notify success
  return true;
};
