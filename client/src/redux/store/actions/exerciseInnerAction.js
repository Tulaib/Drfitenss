/*eslint-disable*/

import { db } from '../../../firebase';
import { addDoc, collection, doc, getDocs } from 'firebase/firestore';
import {
  exercisesConst,
  deleteCollection,
  insertCollection,
  updateCollection,
  viewCollection,
  CurrentUser,
  CurrentPrice,
  CurrentPlan,
  Exerciseplan,
} from '../constant/exerciseInnerConst';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebase';

import { Toast, ToastBody } from 'reactstrap';
import { useEffect, useState } from 'react';

// export const getCurrentUser = (data) => (dispatch) => {
// onAuthStateChanged(auth, (user) => {
//     dispatch({
//       type: CurrentUser.CURRENT_USER,
//       // payload: response,
//     });
//   });
// };

// export const getCurrentUser = (data) => (dispatch) => {
//   dispatch({ type: exercisesConst.RESET_DAY, payload: data });
// };
export const ViewCollection = (collectionName) => async (dispatch) => {
  const globalCollection = collection(db, collectionName);
  const response = await getDocs(globalCollection);
  console.log(response, 'TestingResponse');
  if (response) {
    dispatch({
      type: viewCollection.VIEW_COLLECTION,
      payload: response?.docs?.map((doc) => ({ ...doc.data(), id: doc.id })),
    });
  }
};
export const InserCollection = (collectionName, data) => async (dispatch) => {
  const usersCollectionRef = collection(db, collectionName);
  const response = await addDoc(usersCollectionRef, data);
  if (response) {
    dispatch(ViewCollection());
    <Toast>
      <ToastBody>Added</ToastBody>
    </Toast>;
  } else {
    <Toast>
      <ToastBody>Not add</ToastBody>
    </Toast>;
  }
};

export const getCurrentPrice = (data) => (dispatch) => {
    dispatch({
      type: CurrentPrice.CURRENT_PRICE,
      payload: data,
    });
};
export const getCurrentUser = (data) => (dispatch) => {
    dispatch({
      type: CurrentUser.CURRENT_USER,
      payload: data,
    });
};
export const getTrainerPlan = (data) => (dispatch) => {
    dispatch({
      type: CurrentPlan.CURRENT_PLAN,
      payload: data,
    });
};
export const getExerPlan = (data) => (dispatch) => {
    dispatch({
      type: Exerciseplan.EXERCISEPLAN,
      payload: data,
    });
};