/*eslint-disable*/
import React, { useEffect } from 'react';
import { Badge, Button, Card, CardBody, CardImg, CardSubtitle, CardTitle, Row } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import ImageCards from 'containers/ui/ImageCards';
import ImageLambi from '../../../Images/lambi7.jpg'
import { Lean, challengesLean, yoga  } from './ExerciseMainData';
import { useDispatch, useSelector } from 'react-redux';
import { getExerPlan } from 'redux/store/actions/exerciseInnerAction';
import { Link } from 'react-router-dom';

const ExerciseLean = ({ match }) => {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getExerPlan("leasn"));
  // }, [])

  //  const plan = useSelector((state) => state?.ExercisesReducer?.plan);
  // console.log(plan,"plsan")
  // console.log('yera ans',)
  return (
    <>
      <Row>
        <Colxx xxs="12" >
          <Breadcrumb heading="Exercise" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>

          {Lean.map((item) => {
            return (
              <ImageCards   mainTitle="Dr Fitness Gain Challenge" image={item?.img} badge='Dr Fitness Recommended'
              bColor = "success"
              heading1s={item?.heading1} 
                title={item?.heading} discription={item?.subheading} 
                lean={item?.lean}          
                link={item?.btnlink} />
            );
          })}

        

      </Row>
      <CardTitle className='p-1' style={{fontWeight:'bolder'}}>Belly Fat Challenge</CardTitle>
      <Row>

          {challengesLean.map((item) => {
            return (
              
              <ImageCardss mainTitle="Dr Fitness Gain Challenge" image={item?.img}  badge='Coming Soon!'
              bColor = "danger"
              heading1s={item?.heading1}
              title={item?.heading} discription={item?.subheading} link={item?.btnlink} />
              );
            })}

      
      </Row>
            <CardTitle className='p-1 ' style={{fontWeight:'bolder'}}>Yoga Life</CardTitle>

      <Row>
          {yoga.map((item) => {
            return (

              <ImageCardss mainTitle="Dr Fitness Gain Challenge" image={item?.img} badge='Coming Soon!'
              bColor = "info"
              heading1s={item?.heading1}
                title={item?.heading} discription={item?.subheading} link={item?.btnlink} />
            );
          })}

        

      </Row>
    </>
  );
};

export default ExerciseLean;



const ImageCardss = (props) => {

  return (
    <>
 
      <Colxx xxs="12" xs="6" lg="5">
   
        <Card className="mb-4">
          <div className="position-relative">
            <CardImg
              top
              width='100px'
              height='250px'
              src={props.image}
              alt=""
            />
            <Badge
              color={props.bColor}
              pill
              className="position-absolute badge-top-left-2"
            >
              {props.badge}
            </Badge>
          </div>
          <CardBody>
            <CardSubtitle>
              {props.title}
            </CardSubtitle>
            <CardSubtitle className="mb-4">
              {props.discription}
            </CardSubtitle>
            <div className="d-flex justify-content-end">
            </div>
          </CardBody>
        </Card>
   
      </Colxx>
    </>
  );
};
