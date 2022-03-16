/*eslint-disable*/
import React from 'react';
import { Row } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import Home from './Home';
import './chat.css'

const Chat = ({ match }) => {
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="chat" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        {/* <Colxx xxs="12" className="mb-4">
          <p>
            chat conpo
          </p>
        </Colxx> */}
        <Home />
      </Row>
    </>
  );
};

export default Chat;
