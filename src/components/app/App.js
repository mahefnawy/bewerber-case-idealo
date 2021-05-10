import React, { useState, useEffect, useRef, useLayoutEffect}  from 'react';
import { Row, Col, Modal, Button, Form, Input, Radio, Select} from 'antd';
import { PlusOutlined, SendOutlined } from '@ant-design/icons';
import { useRecoilState } from "recoil";
import { usersDataAtom } from "../../utils/atoms";
import UsersInfoSearchTable from '../partials/usersInfoSearchTable/UsersInfoSearchTable';
import './App.scss';

function App() {
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [usersDataAtomRecoilState, setUsersDataAtomRecoilState] = useRecoilState(usersDataAtom);
  const [addUserFormInitialValues, setAddUserFormInitialValues] = useState({ gender: 'male' });
  const [isAddUserModalVisible, setIsAddUserModalVisible] = useState(false);
  const [isEditUserModalVisible, setIsEditUserModalVisible] = useState(false);
  const [activeId, setActiveId] = useState(false);

  function onTableFullEditClickHandler(record) {
    setActiveId(record.id)
    setIsEditUserModalVisible(true);
    form.setFieldsValue(record);
  };

  function onTableDeleteClickHandler(idValue) {
    // console.log(idValue);
  };

  function handleCancelAddUserModal() {
    form.resetFields();
    setIsAddUserModalVisible(false);
  };

  function handleCancelEditUserModal() {
    form.resetFields();
    setActiveId(false);
    setIsEditUserModalVisible(false);
  };

  //API
  function onAddUser(values) {
    let oldDataArr = usersDataAtomRecoilState;
    let newDataArr = [...oldDataArr];
    let newId = oldDataArr.length + 1;
    let newUser =    {
      "id": newId,
      "username": values.username,
      "gender": values.gender,
      "firstname": values.firstname,
      "surname": values.surname,
      "address": values.address,
      "quote": values.quote
    }
  
    newDataArr.push(newUser);
    setUsersDataAtomRecoilState(newDataArr)
    setIsAddUserModalVisible(false);
    form.resetFields();
  };

  function onEditUser(values) {
    let id = activeId;
    let oldDataArr = usersDataAtomRecoilState;
    let newDataArr = [...oldDataArr];
    let finalDataArr = newDataArr.map(userObj=>{
      if(userObj.id === id){
        return userObj = {
          "id": id,
          "username": values.username,
          "gender": values.gender,
          "firstname": values.firstname,
          "surname": values.surname,
          "address": values.address,
          "quote": values.quote
        }
      } else {
        return userObj;
      }
    });

    setUsersDataAtomRecoilState(finalDataArr)
    setIsEditUserModalVisible(false);
    setActiveId(false);
    form.resetFields();
  };

  return (
    <div className="App">
      <Row className="over-flow-scroll">
        <Col  xs={24} sm={24} md={24} lg={24} xl={24}>
          <UsersInfoSearchTable data={usersDataAtomRecoilState} onFullEditClick={onTableFullEditClickHandler} onDeleteClick={onTableDeleteClickHandler}/>
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
          title="Add User"
          >
            <Row className="">
              <Col  xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form form={form} name="adduserform" onFinish={onAddUser} initialValues={addUserFormInitialValues}>
                  <Form.Item name={['username']} label="User Name" rules={[{ required: false }]}>
                    <Input placeholder="User Name" style={{ width: 300, marginTop: 16, marginBottom: 16 }} allowClear/>
                  </Form.Item>
                  <Form.Item name={['gender']} label="Gender" rules={[{ required: false, }]}>
                    <Radio.Group className="">
                      <Radio.Button value="male">Male</Radio.Button>
                      <Radio.Button value="female">Female</Radio.Button>
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
          <Modal
          centered
          visible={isEditUserModalVisible}
          onCancel={handleCancelEditUserModal}
          closable={true}
          footer={false}
          title="Edit User"
          >
            <Row className="">
              <Col  xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form form={form} name="adduserform" onFinish={onEditUser} initialValues={addUserFormInitialValues}>
                  <Form.Item name={['username']} label="User Name" rules={[{ required: false }]}>
                    <Input placeholder="User Name" style={{ width: 300, marginTop: 16, marginBottom: 16 }} allowClear/>
                  </Form.Item>
                  <Form.Item name={['gender']} label="Gender" rules={[{ required: false, }]}>
                    <Radio.Group className="">
                      <Radio.Button value="male">Male</Radio.Button>
                      <Radio.Button value="female">Female</Radio.Button>
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
