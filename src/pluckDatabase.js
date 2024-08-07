import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataStudent } from "./redux/slices/dashboard";
import { getSubjects } from "./redux/slices/subjects";
import { getUserTests } from "./redux/slices/usertests";
import { getQuestionsPreload } from "./redux/slices/questions";
import { getLoggedUser } from "./redux/slices/users";
import { db } from "./database";

function useBulkData() {
  const dispatch = useDispatch();
  const { isOnline } = useSelector((state) => state.onlinestatus);

  useEffect(() => {
    if (isOnline) {
      dispatch(getUserTests()).then((data) => {
        preloadUserTest(data);
      });
      dispatch(getSubjects(false)).then((data) => {
        preloadSubjects(data);
      });
      dispatch(getLoggedUser(false)).then((data) => {
        preloadUser(data);
      });
      dispatch(getQuestionsPreload()).then((data) => {
        preloadQuestions(data.data);
      });
      dispatch(getDataStudent()).then((data) => {
        preloadDashboard(data);
      });
    }
  }, [isOnline]);
}

const preloadQuestions = async (questions) => {
  await db.questions.bulkPut(questions);
};

const preloadSubjects = async (sub) => {
  await db.subjects.bulkPut(sub);
};

const preloadUserTest = async (info) => {
  await db.infotest.bulkPut(info);
};

const preloadDashboard = async (info) => {
  await db.dashboard.toArray().then((result) => {
    if (result.length === 0) {
      db.dashboard.add(info);
    }
  })
};

const preloadUser = async (us) => {
  if (us && (typeof us.id === "string" || typeof us.id === "number")) {
    try {
      const existingItem = await db.user.where("id").equals(us.id).first();
      if (!existingItem) {
        await db.user.add(us);
      }
    } catch (error) {
      console.error("Error al pre-cargar datos de usuario:", error);
    }
  } else {
    console.warn("Datos de usuario no válidos para pre-cargar.");
  }
};

export default useBulkData;
