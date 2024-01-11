import Dexie from "dexie";

export const db = new Dexie("myDatabase");
db.version(2).stores({
  questions: "++id, question, a, b, c, d, e, answer, explanation, subject_id",
});
