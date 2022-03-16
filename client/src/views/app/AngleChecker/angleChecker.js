/*eslint-disable*/
import React from 'react';
import { Button, Row } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import Rating from 'components/common/Rating';
import imgs from 'Images/tulaibs.PNG';
import shoulder from '../../../Images/intermediate/shoulder.jpg';
import { saveAs } from 'file-saver';

const AngleChecker = ({ match }) => {
  const saveFile = () => {
    saveAs(
      'https://drive.google.com/file/d/1LKhhv10F-WQMNl6sTSPiIory2Zm86fnh/view?usp=sharing'
    );
  };
  const saveFile1 = () => {
    saveAs(
      'https://drive.google.com/file/d/1Mtua5FDECcoAuigvReJWgPZzkvwakaSE/view?usp=sharing'
    );
  };
  const saveFile2 = () => {
    saveAs(
      'https://drive.google.com/file/d/1Gb337VZVzMqRiTHNuaEo2JgJ8Woj3k6g/view?usp=sharing'
    );
  };
  const saveFile3 = () => {
    saveAs(
      'https://drive.google.com/file/d/1WQZKsCYColhm1qllT4jCCb9Gkux0Cz7P/view?usp=sharing'
    );
  };
  const saveFile4 = () => {
    saveAs(
      'https://drive.google.com/file/d/1EyjmULN9MwtLMBe06SKt4aCEv0-0rrjV/view?usp=sharing'
    );
  };

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="Angle Checker" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
          <div>
            <h4 className=" mt-1 font-weight-bold">
              Instruction to Pose Estimation Counter
            </h4>
            <ol>
              <li>Install Python in your PC</li>
              <li>
                After installing Pyhton, Open CMD type "pip install pyinstaller"
              </li>
              <li>then install "pip install py2exe"</li>
              <li>Then open .py file. Ready to use! (Eg: shoulders.py)</li>
            </ol>
            {/* <a download={saveFile}      href=  'https://firebasestorage.googleapis.com/v0/b/drfitness-d7c30.appspot.com/o/shoulders.py?alt=media&token=c915de05-1f1f-426c-bcde-b9d081893cce'>download</a> */}
          </div>
        </Colxx>
        <Row>
          {/* <div style={{display:'flex',justifyContent:'space-evenly'}}> */}
          <Colxx xxs="12" className="mb-4">
            <Button
              onClick={saveFile}
              style={{  borderRadius: '0',minWidth:'100px' }}
              outline
            >
              Shoulders
            </Button>
            </Colxx>
            <Colxx xxs="12" className="mb-4">
            <Button
              onClick={saveFile1}
              style={{  borderRadius: '0',minWidth:'100px' }}
              outline
            >
              Biceps
            </Button>
            </Colxx>

            <Colxx xxs="12" className="mb-4">
            <Button
              onClick={saveFile2}
              style={{  borderRadius: '0',minWidth:'100px' }}
              outline
            >
              Pushups
            </Button>
            </Colxx>

            <Colxx xxs="12" className="mb-4">
            <Button
              onClick={saveFile3}
              style={{ borderRadius: '0',minWidth:'100px' }}
              outline
            >
              Squats
            </Button>
            </Colxx>

            <Colxx xxs="12" className="mb-4">
            <Button
              onClick={saveFile4}
              style={{  borderRadius: '0',minWidth:'100px' }}
              outline
            >
              Tricep
            </Button>
            </Colxx>


          <h4 className="text-center mt-4 font-weight-bold">
            Click To download Estimation Counter of specific exercise
          </h4>
        </Row>
      </Row>
    </>
  );
};

export default AngleChecker;
