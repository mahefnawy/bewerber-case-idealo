import React from 'react';
import { Table, Input, Button, Space, Tooltip, Tag } from 'antd';
import Highlighter from 'react-highlight-words';
import {
    SearchOutlined,
    EditOutlined,
    DeleteOutlined,
    CopyOutlined,
} from '@ant-design/icons';

class UsersInfoSearchTable extends React.Component {
    state = {
        searchText: '',
        searchedColumn: '',
    };

    getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
        }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={(node) => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        this.handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() =>
                            this.handleSearch(selectedKeys, confirm, dataIndex)
                        }
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => this.handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{ color: filtered ? '#1890ff' : undefined }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex]
                      .toString()
                      .toLowerCase()
                      .includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => this.searchInput.select(), 100);
            }
        },
        render: (text) =>
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

    handleFullEditClick = (record) => {
        this.props.onFullEditClick(record);
    };

    handleDeleteClick = (id) => {
        this.props.onDeleteClick(id);
    };

    handleDuplicateClick = (record) => {
        this.props.onDuplicateClick(record);
    };

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = (clearFilters) => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    render() {
        const data = [...this.props.data];
        const columns = [
            {
                title: 'Id',
                dataIndex: 'id',
                key: 'key',
                ...this.getColumnSearchProps('id'),
                render: (text) => <span>{text}</span>,
            },
            {
                title: 'User Name',
                dataIndex: 'username',
                key: 'key',
                ...this.getColumnSearchProps('username'),
                render: (text) => <span>{text}</span>,
            },
            {
                title: 'Gender',
                dataIndex: 'gender',
                key: 'gender',
                ...this.getColumnSearchProps('gender'),
                render: (gender) =>
                    gender === 'male' ? (
                        <Tag color="blue" key={gender}>
                            {gender}
                        </Tag>
                    ) : (
                        <Tag color="pink" key={gender}>
                            {gender}
                        </Tag>
                    ),
            },
            {
                title: 'First Name',
                dataIndex: 'firstname',
                key: 'key',
                ...this.getColumnSearchProps('firstname'),
                render: (text) => <span>{text}</span>,
            },
            {
                title: 'Surname',
                dataIndex: 'surname',
                key: 'key',
                ...this.getColumnSearchProps('surname'),
                render: (text) => <span>{text}</span>,
            },
            {
                title: 'Address',
                dataIndex: 'address',
                key: 'key',
                ...this.getColumnSearchProps('address'),
                render: (text) => <span>{text}</span>,
            },
            {
                title: 'Quote',
                dataIndex: 'quote',
                key: 'key',
                ...this.getColumnSearchProps('quote'),
                render: (text) => <span>{text}</span>,
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <Space size="middle">
                        <Tooltip title="Edit">
                            <Button
                                onClick={(e) =>
                                    this.handleFullEditClick(record)
                                }
                                icon={<EditOutlined />}
                                type="primary"
                                shape="circle"
                                className=""
                            />
                        </Tooltip>
                        <Tooltip title="Delete">
                            <Button
                                onClick={(e) =>
                                    this.handleDeleteClick(record.id)
                                }
                                icon={<DeleteOutlined />}
                                type="primary"
                                shape="circle"
                                danger
                                className=""
                            />
                        </Tooltip>
                        <Tooltip title="Duplicate">
                            <Button
                                onClick={(e) =>
                                    this.handleDuplicateClick(record)
                                }
                                icon={<CopyOutlined />}
                                className="duplicate-btn"
                                type="primary"
                                shape="circle"
                            />
                        </Tooltip>
                    </Space>
                ),
            },
        ];

        return (
            <Table
                title={() => (
                    <span className="table-title">Users information</span>
                )}
                footer={() => ''}
                columns={columns}
                dataSource={data}
                pagination={false}
            />
        );
    }
}

export default UsersInfoSearchTable;
