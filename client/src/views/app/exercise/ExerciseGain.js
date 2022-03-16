/*eslint-disable*/
import React from 'react';
import { Badge, Card, CardBody, CardImg, CardSubtitle, CardTitle, Row } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import {
  Advance,
  beginner,
  challenges,
  gain,
  Intermediate,
} from './ExerciseMainData';
// import { Colxx, Separator } from 'components/common/CustomBootstrap';
// import Breadcrumb from 'containers/navs/Breadcrumb';
import ImageCards from 'containers/ui/ImageCards';
import './exercise.css'
import ImageLambi from '../../../Images/lambi7.jpg';
import GlideComponent from 'components/carousel/GlideComponent';
import ExInner from './ExerciseInnerPage';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
const ExerciseGain = ({ match }) => {

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getExerPlan("gain"));
  // }, [])

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="Exercise" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row 
      className='justify-content-center'
      >
        {gain.map((item) => {
          return (
            <ImageCards
              mainTitle="Dr Fitness Gain Challenge"
              image={item?.img}
              badge="Dr Fitness Recommended"
              bColor = "success"
              title={item?.heading}
              showweeksndays={item?.showweeknday}
              discription={item?.subheading}
              link={item?.btnlink}
              heading1s={item?.heading1}
            />
          );
        })}
      </Row>
      <Row
      className='justify-content-center'
      >
        {challenges.map((item) => {
          return (
            <ImageCardss
              mainTitle="Dr Fitness Gain Challenge"
              image={item?.img}
              badge="Coming Soon!"
              bColor = "success"
              heading1s={item?.heading1}
              title={item?.heading}
              showweeksndays={item?.showweeknday}
              discription={item?.subheading}
              // link={item?.btnlink}
            />
          );
        })}
      </Row>
      <Row>
        <CardTitle className='p-3' style={{fontWeight:'bolder'}}>Are You A Beginner? Don't Worry try These Exercises</CardTitle>
        <div
          className="mb-4 "
          style={{
            width: '100%',
            display: 'flex',
            flexWrap:'nowrap',
            // justifyContent: 'center',
            // overflow: 'auto',
            // display:'inline-block',
            overflowX: "scroll",
            scrollbarWidth:'thin',
            scrollbarColor: "blue orange"
            // overflowY: "hidden",
            // whiteSpace: 'nowrap',
          }}
        >
          {beginner.map((item) => {
            return (
              <>
                <ImageCards
                  mainTitle="Dr Fitness Gain Challenge"
                  image={item?.img}
                  badge="Hot"
              bColor = "danger"
                 showweeksndays={item?.showweeknday}
                  heading1s={item?.heading1}
                  title={item?.heading}
                  discription={item?.subheading}
                  link={item?.btnlink}
                  heading={item?.heading}
                  type={item?.type}
                />
              </>
            );
          })}
        </div>
      </Row>
      <Row>
      <CardTitle className='p-3' style={{fontWeight:'bolder'}}>Intermediate Exercises</CardTitle>
      <div
          className="mb-4 "
          style={{
            width: '100%',
            display: 'flex',
            // justifyContent: 'center',
            overflow: 'auto',
            whiteSpace: 'nowrap',
          }}
        >
        {Intermediate.map((item) => {
          return (
            <ImageCards
              mainTitle="Dr Fitness Gain Challenge"
              image={item?.img}
              badge="Trend"
              bColor = "warning"
              heading1s={item?.heading1}
              title={item?.heading}
              showweeksndays={item?.showweeknday}
              discription={item?.subheading}
              link={item?.btnlink}
              heading={item?.heading}
              type={item?.type}
            />
          );
        })}
        </div>
      </Row>
      <Row>
      <CardTitle className='p-3' style={{fontWeight:'bolder'}}>Advance Exercises</CardTitle>

      <div
          className="mb-4 "
          style={{
            width: '100%',
            display: 'flex',
            // justifyContent: 'center',
            overflow: 'auto',
            whiteSpace: 'nowrap',
            
          }}
        >
        {Advance.map((item) => {
          return (
            <ImageCards
              mainTitle="Dr Fitness Gain Challenge"
              image={item?.img}
              badge="Experts Only"
              bColor = "info"
              heading1s={item?.heading1}
              title={item?.heading}
              discription={item?.subheading}
              link={item?.btnlink}
              heading={item?.heading}
              type={item?.type}
              showweeksndays={item?.showweeknday}
            />
          );
        })}
        </div>
      </Row>
    </>
  );
};

export default ExerciseGain;

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

