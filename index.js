import { Firestore } from "@google-cloud/firestore";

const db = new Firestore();

async function storeIds(collectionName) {
  // Get all document references in the collection
  const snapshot = await db.collection(collectionName).get();
  
  // Extract the IDs
  const ids = snapshot.docs.map(doc => doc.id);

  // Create/Update the ID document in the "IDs" collection
  await db.collection('IDs').doc(`${collectionName}IDs`).set({ IDs: ids });
  
  console.log(`Updated IDs for ${collectionName}`);
}

const collections = [
  'QuizzesAdvanced', 
  'QuizzesBeginner', 
  'QuizzesImpossible', 
  'QuizzesIntermediate',
];

collections.forEach(storeIds);
