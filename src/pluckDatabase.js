import React from "react";
import { useDispatch } from "react-redux";
import { getDataStudent } from "./redux/slices/dashboard";
import { getSubjects } from "./redux/slices/subjects";
import { getUserTests } from "./redux/slices/usertests";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./database";
import useAuth from "./hooks/useAuth";

function useBulkData() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const subjs = useLiveQuery(() => db.subjects.toArray());
  try {
    preloadUser(user);
    const timeoutId = setTimeout(() => {
      dispatch(getUserTests()).then((data) => {
        preloadUserTest(data);
      });
      dispatch(getSubjects()).then((data) => {
        preloadSubjects(data);
      });
      dispatch(getDataStudent()).then((data) => {
        preloadDashboard(data);
      });
    }, 1000);
    if (subjs?.length) {
      clearTimeout(timeoutId);
    }
  } catch (err) {
    console.log(err);
  }
}

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
  });
};

const preloadUser = async (us) => {
  if (us && (typeof us.id === 'string' || typeof us.id === 'number')) {
    try {
      const existingItem = await db.user.where('id').equals(us.id).first();
      if (!existingItem) {
        await db.user.add(us);
      }
    } catch (error) {
      console.error('Error al pre-cargar datos de usuario:', error);
    }
  } else {
    console.warn('Datos de usuario no válidos para pre-cargar.');
  }
};

export default useBulkData;
