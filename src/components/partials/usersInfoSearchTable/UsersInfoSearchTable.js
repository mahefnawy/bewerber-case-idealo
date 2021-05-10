import React from 'react';
import { Table, Input, Button, Space, Row } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

class UsersInfoSearchTable extends React.Component {
  state = {
    searchText: '',
    searchedColumn: '',
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  handleFullEditClick = (e) => {
    let targetID = e.target.parentNode.parentNode.parentNode.parentNode.getAttribute("data-row-key");
    this.props.onFullEditClick(targetID);
  }

  handleDeleteClick = (e) => {
    let targetID = e.target.parentNode.parentNode.parentNode.parentNode.getAttribute("data-row-key");
    this.props.onDeleteClick(targetID);
  }

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };


  render() {
    const loading = this.props.tableLoading;
    const data = [
      ...this.props.data
    ];
    const columns = [
      {
        title: 'Id',
        dataIndex: 'id',
        key: 'key',
        ...this.getColumnSearchProps('id'),
        render: text => <span>{text}</span>
      },
      {
        title: 'User Name',
        dataIndex: 'username',
        key: 'key',
        ...this.getColumnSearchProps('username'),
        render: text => <span>{text}</span>
      },
      {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'key',
        ...this.getColumnSearchProps('gender'),
        render: text => <span>{text}</span>
      },
      {
        title: 'First Name',
        dataIndex: 'firstname',
        key: 'key',
        ...this.getColumnSearchProps('firstname'),
        render: text => <span>{text}</span>
      },
      {
        title: 'Surname',
        dataIndex: 'surname',
        key: 'key',
        ...this.getColumnSearchProps('surname'),
        render: text => <span>{text}</span>
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'key',
        ...this.getColumnSearchProps('address'),
        render: text => <span>{text}</span>
      },
      {
        title: 'Quote',
        dataIndex: 'quote',
        key: 'key',
        ...this.getColumnSearchProps('quote'),
        render: text => <span>{text}</span>
      },
      {
        title: 'Action',
        fixed: 'right',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <span onClick={(e) => this.handleFullEditClick(e)}>Edit</span>
            <span onClick={(e) => this.handleDeleteClick(e)}>Delete</span>
          </Space>
        ),
      },
    ];
    return (
      <Row className="over-flow-scroll">
        <Table title={() => 'Users information'}  footer={() => ''} columns={columns} dataSource={data} scroll={{ x: 10 }} sticky pagination={false}/>
      </Row>
    )
  }
}

export default UsersInfoSearchTable;
