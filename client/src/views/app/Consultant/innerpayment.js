/*eslint-disable*/

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { set } from 'react-hook-form';
import { addDoc, collection } from 'firebase/firestore';
import { db } from 'firebase';
// import './stripecontainer.css';

toast.configure();

export default function Innerpayment(props) {

  const feesFromModal = useSelector(
    (state) => state?.ExercisesReducer?.crrpayinfo
  );
  const trainerPlan = useSelector(
    (state) => state?.ExercisesReducer?.crrprlan
  );
  const UserInfo = useSelector((state) => state?.ExercisesReducer?.crruser);

  var data = props?.allData;

  console.log(data?.selectedDate);

  var uname, userid;

  UserInfo.map((user) => {
    (uname = user.name), (userid = user.uid);
  });

  console.log('Inner Page KA Data hai ye: ' , data);
  // console.log('feesfrommodeal',props.price)

  const price = props.prices;
  const feesFromModaluid = feesFromModal.uid;


  const feesFromModalcon = feesFromModal.conType;

  const feesFromModalweek = feesFromModal.weekly;
  const feesFromModalmonth = feesFromModal.Monthly;
  const feesFromModalyear = feesFromModal.Yearly;

  console.log('contype batar ha ye ;;;; ',feesFromModalcon)
  console.log('contype Plan ',trainerPlan)

  async function handleToken(token, addresses) {
    const response = await axios.post('http://localhost:4000/checkout', {
      token,
      uname,
      userid,
      uname,
      price,
      feesFromModaluid,
    });
    const { status } = response.data;
    console.log('Response:', response.data);

    const AddSlotsInDB = async () => {
       
          if(feesFromModalcon === 'doctor')
          {
            try {
            await addDoc(collection(db, 'appointment'), {
              appointmentType: 'consultation',
              uid: data?.uid,
              userpic: data?.userpic,
              username: data?.username,
              DocID: data?.DocID,
              DocName: data?.DocName,
              Docpic: data?.Docpic,
              fee: data?.fee,
              status: data?.status,
              slotTime: data?.slotTime,
              reason: data?.reason,
              selectedDate: data?.selectedDate,
              createAt: data?.createAt,
            });
            toast.success('Appointment generated,Please check appointment table')
          } catch (error) {
            toast.error('Data Not Sent' + error);
          }
          }
          else{

            const AddSlotsInDBPayment = async () => {
              try {
                await addDoc(collection(db, 'invoices'), {
                  appointmentType: 'trainer',
                  uid: data?.uid,
                  userpic: data?.userpic,
                  username: data?.username,
                  DocID: data?.DocID,
                  DocName: data?.DocName,
                  Docpic: data?.Docpic,
                  fee:price,
                  invoiceStatus:'false',
                  feeDoc: price*80/100,
                  // status: data?.status,
                  slotTime: data?.slotTime,
                  // reason: data?.reason,
                  selectedDate: data?.selectedDate,
                  createAt: data?.createAt,
                });
                toast.success('Invoices Created');
              } catch (error) {
                toast.error('Invoices Not Created' + error);
                console.log('Invoices Not Created' + error);
              }
            };


            try {
              await addDoc(collection(db, 'appointment'), {
                appointmentType: 'trainer',
                uid: data?.uid,
                userpic: data?.userpic,
                username: data?.username,
                DocID: data?.DocID,
                DocName: data?.DocName,
                Docpic: data?.Docpic,
                fee: price,
                feeDoc:price *80/100,
                plan:trainerPlan,
                // status: data?.status,
                slotTime: data?.slotTime,
                reason: data?.reason,
                selectedDate: data?.selectedDate,
                createAt: data?.createAt,
              });
              toast.success('Appointment generated,Please check appointment table')
            } catch (error) {
              toast.error('Data Not Sent' + error);
            }
       
            AddSlotsInDBPayment();
          }
    
      };
    // const AddSlotsInDBPayment = async () => {
    //     try {
    //       await addDoc(collection(db, 'invoices'), {
    //         appointmentType: 'consultation',
    //         uid: data?.uid,
    //         userpic: data?.userpic,
    //         username: data?.username,
    //         DocID: data?.DocID,
    //         DocName: data?.DocName,
    //         Docpic: data?.Docpic,
    //         fee: data?.fee,
    //         invoiceStatus:'false',
    //         feeDoc: data?.fee * 80/100,
    //         status: data?.status,
    //         slotTime: data?.slotTime,
    //         // reason: data?.reason,
    //         selectedDate: data?.selectedDate,
    //         createAt: data?.createAt,
    //       });
    //       toast.success('Invoices Created');
    //     } catch (error) {
    //       toast.error('Invoices Not Created' + error);
    //     }
    //   };
    if (status === 'success') {
        toast('Success! Check email for details', { type: 'success' });
        AddSlotsInDB();
        // AddSlotsInDBPayment();
    } else {
      toast('Something went wrong', { type: 'error' });
    }
  }

  var names = uname?.length ;
  return (
    <div className=" d-block justify-content-center" style={{width:'max-content'}}>
      <div style={{ color: 'gray',width:"100%" }}>
        <p>
          Name:{' '}
          <span
            className="float-right"
            style={{ textTransform: 'capitalize', fontWeight: 'bold',color:'green' }}
          >
            {uname}
          </span>
        </p>
        <p>
          Booked with:{' '}
          <span
            className="float-right"
            style={{ textTransform: 'capitalize', fontWeight: 'bold',color:'green' }}
          >
            {feesFromModal.name}
          </span>
        </p>
        <p>
          Selected Date:{' '}
          <span
            className="float-right"
            style={{ textTransform: 'capitalize', fontWeight: 'bold',color:'green' }}
          >
            {data?.selectedDate}
          </span>
        </p>
        <p>
          {
            feesFromModalcon === 'doctor' ?
            
            <>
             Slot:{' '}
          <span
            className="float-right"
            style={{ textTransform: 'capitalize', fontWeight: 'bold',color:'green' }}
          >
            {data?.slotTime}
          </span>
            </>
            :
            <>
            Plan:{' '}
         <span
           className="float-right"
           style={{ textTransform: 'capitalize', fontWeight: 'bold',color:'green' }}
         >
           {trainerPlan}
         </span>
           </>
            
          }
         
        </p>
        <p>
          Appointment Fee{' '}
          <span
            className="float-right"
            style={{ textTransform: 'capitalize', fontWeight: 'bold',color:'green' }}
          >
            {' '}
              {price} PKR
          </span>
        </p>
        {
        names > 1  ?  
        <StripeCheckout
        stripeKey="pk_test_51KV05EE6nbSSxCIjDdge9ne28bMevfze801LCN1dSWAHlDFyJLwXp1ayUTROsqwnvnMCXSP0nF1yM4KdcrJtoZ9L00KeoYgGCs"
        token={handleToken}
        amount={price * 100 * 0.0056  }
        name={uname} 
        billingAddress
        shippingAddress
        />
        :
        ""
  
    }
      </div>
     
    </div>
  );
}
