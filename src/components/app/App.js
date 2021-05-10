import React, { useState, useEffect, useRef, useLayoutEffect}  from 'react';
import { Row, Col, Modal, Button, Form, Input, Radio, Select} from 'antd';
import { PlusOutlined, SendOutlined } from '@ant-design/icons';
import { useRecoilState } from "recoil";
import { usersDataAtom } from "../../utils/atoms";
import UsersInfoSearchTable from '../partials/usersInfoSearchTable/UsersInfoSearchTable';
import './App.scss';

function App() {
  const { TextArea } = Input;
  const [usersDataAtomRecoilState, setUsersDataAtomRecoilState] = useRecoilState(usersDataAtom);
  const [isAddUserModalVisible, setIsAddUserModalVisible] = useState(false);

  function handleCancelAddUserModal() {
    setIsAddUserModalVisible(false);
  };

  function onFinish(values) {
    console.log(values)
  };

  return (
    <div className="App">
      <Row className="over-flow-scroll">
        <Col  xs={24} sm={24} md={24} lg={24} xl={24}>
          <UsersInfoSearchTable data={usersDataAtomRecoilState}/>
        </Col>
        <Col  xs={24} sm={24} md={24} lg={24} xl={24}>
          <Button className="checklists-cta-buttons" type="primary" icon={<PlusOutlined />} onClick={(e)=>{setIsAddUserModalVisible(true)}}>Add Resident</Button>
        </Col>
          <Modal
          centered
          visible={isAddUserModalVisible}
          onCancel={handleCancelAddUserModal}
          closable={true}
          footer={false}
          >
            <Row className="">
              <Col  xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form  name="" onFinish={onFinish} initialValues={{ gender: 'm' }}>
                  <Form.Item name={['username']} label="User Name" rules={[{ required: false }]}>
                    <Input placeholder="User Name" style={{ width: 300, marginTop: 16, marginBottom: 16 }} allowClear/>
                  </Form.Item>
                  <Form.Item name={['gender']} label="Gender" rules={[{ required: false, }]}>
                    <Radio.Group className="">
                      <Radio.Button value="m">Male</Radio.Button>
                      <Radio.Button value="f">Female</Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item name={['firstname']} label="First Name" rules={[{ required: true, message: 'Please Enter First Name!' }]}>
                    <Input placeholder="First Name" style={{ width: 300, marginTop: 16, marginBottom: 16 }} allowClear/>
                  </Form.Item>
                  <Form.Item name={['surname']} label="Surname" rules={[{ required: false }]}>
                    <Input placeholder="Surname" style={{ width: 300, marginTop: 16, marginBottom: 16 }} allowClear/>
                  </Form.Item>
                  <Form.Item name={['address']} label="Address" rules={[{ required: false }]}>
                    <TextArea placeholder="Address" style={{ width: 300, marginTop: 16, marginBottom: 16 }} allowClear/>
                  </Form.Item>
                  <Form.Item name={['quote']} label="Quote" rules={[{ required: false }]}>
                    <TextArea placeholder="Quote" style={{ width: 300, marginTop: 16, marginBottom: 16 }} allowClear/>
                  </Form.Item>
                  <Button icon={<SendOutlined />} type="primary" htmlType="submit" className="submit-btn">
                    Submit
                  </Button>
                </Form>
              </Col>
            </Row>
          </Modal>
      </Row>
    </div>
  );
}

export default App;
