import Dexie from "dexie";

const db = new Dexie("offlinebase");
db.version(2).stores({
  questions: "++id, question, a, b, c, d, e, answer, explanation, subject_id",
});

export default db;
