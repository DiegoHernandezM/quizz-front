import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataStudent } from "./redux/slices/dashboard";
import { getSubjects } from "./redux/slices/subjects";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./database";

function useBulkData() {
  const dispatch = useDispatch();
  const subjs = useLiveQuery(() => db.subjects.toArray());
  try {
    const timeoutId = setTimeout(() => {
      dispatch(getSubjects()).then((data) => {
        preloadSubjects(data.data);
      });
    }, 1000);
    if (subjs?.length) {
      console.log(subjs);
      clearTimeout(timeoutId);
    }
  } catch (err) {
    console.log(err);
  }
}

const preloadSubjects = async (sub) => {
  await db.subjects.bulkPut(sub);
};

export default useBulkData;
