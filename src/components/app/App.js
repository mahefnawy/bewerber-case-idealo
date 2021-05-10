import React, { useState, useEffect, useRef, useLayoutEffect}  from 'react';
import { Row, Col} from 'antd';
import { useRecoilState } from "recoil";
import { usersDataAtom } from "../../utils/atoms";
import UsersInfoSearchTable from '../partials/usersInfoSearchTable/UsersInfoSearchTable';
import './App.scss';

function App() {
  const [usersDataAtomRecoilState, setUsersDataAtomRecoilState] = useRecoilState(usersDataAtom);

  return (
    <div className="App">
      <Row className="over-flow-scroll">
        <Col  xs={24} sm={24} md={24} lg={24} xl={24}>
          <UsersInfoSearchTable data={usersDataAtomRecoilState}/>
        </Col>
      </Row>
    </div>
  );
}

export default App;
