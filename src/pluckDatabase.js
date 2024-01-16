import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
    const timeoutId = setTimeout(() => {
      dispatch(getUserTests()).then((data) => {
        preloadUserTest(data);
      });
      dispatch(getSubjects()).then((data) => {
        preloadSubjects(data.data);
        preloadUser(user);
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

const preloadUser = async (us) => {
  if (us) {
    await db.user.where('id').equals(us.id).first()
      .then(existingItem => {
        if (!existingItem) {
          db.user.add(us);
        }
      })
      .catch(error => {
        console.error('Error al validar la clave:', error);
      });
  }
};

export default useBulkData;
