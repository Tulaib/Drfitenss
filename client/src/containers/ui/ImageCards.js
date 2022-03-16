/*eslint-disable*/
import React from 'react';
import {
  CardText,
  CardSubtitle,
  Row,
  Card,
  CardBody,
  CardTitle,
  CardImg,
  Badge,
  Button
} from 'reactstrap';
import {Link,useHistory} from 'react-router-dom'
// import { useHistory } from 'react-router-dom';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';
import GlideComponent from 'components/carousel/GlideComponent';
import { useSelector } from 'react-redux';

const ImageCards = (props) => {

  // const plan = useSelector((state) => state?.ExercisesReducer?.plan);

  // console.log(plan,"plan")

  // const history = useHistory();
  // console.log(props?.showweeknday )

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
            <CardTitle>
              {props.title}
            </CardTitle>
            <CardSubtitle className="mb-4">
              {props.discription}
            </CardSubtitle>
            <div className="d-flex justify-content-end">
              

              {
                
                props?.lean === true ? 
                <Link   
                //  to = {{pathname:`${props.link}`}}
                  to={{pathname:`/app/exercise/exerciseInnerPage2`
                  ,data:{showweeknday:props?.showweeksndays , heading1:props?.heading1s,heading:props?.heading,type:props?.type}}}
                  
                  >
                  <Button color="success" className="mb-2" onClick={()=>{
                    console.log(history,"<-props")
                  }}>
                    Start Plan
                  </Button>
                    </Link>
                :
                <Link   
                //  to = {{pathname:`${props.link}`}}
                  to={{pathname:`/app/exercise/exerciseInnerPage`
                  ,data:{showweeknday:props?.showweeksndays , heading1:props?.heading1s,heading:props?.heading,type:props?.type}}}
                  
                  >
                  <Button color="success" className="mb-2" onClick={()=>{
                    console.log(history,"<-props")
                  }}>
                    Start Plan
                  </Button>
                    </Link>
              }

             



            </div>
          </CardBody>
        </Card>
   
      </Colxx>
    </>
  );
};

export default ImageCards;
