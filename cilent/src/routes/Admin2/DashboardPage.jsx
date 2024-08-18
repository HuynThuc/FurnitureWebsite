import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LaptopOutlined, NotificationOutlined, UserOutlined, PlusOutlined } from '@ant-design/icons';
import { EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { Avatar, Breadcrumb, Layout, Menu, Typography, theme, Table, Modal, Form, Input, Button, Select, Upload, message } from 'antd';
import AdminImage from '../../images/logo-moho.webp';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles



import '../Admin2/DashboardPage.css';


const { Option } = Select;



const { Header, Content, Footer, Sider } = Layout;
const { Text } = Typography;



const items2 = [
    {
        key: 'sub1',
        icon: <UserOutlined />,
        label: 'Người Dùng',

    },
    {
        key: 'sub2',
        icon: <LaptopOutlined />,
        label: 'Sản Phẩm',
        children: [
            { key: 'sub2-1', label: 'Quản lý sản phẩm' },
            { key: 'sub2-2', label: 'Loại sản phẩm' },
        ],
    },
    {
        key: 'sub3',
        icon: <NotificationOutlined />,
        label: 'Đơn Hàng',

    },

];

// Sample data and columns for each subnav item
const userData = [
    {
        key: '1',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street',
        phoneNumber: '1234567890'
    },
    {
        key: '2',
        name: 'John',
        age: 42,
        address: '10 Downing Street',
        phoneNumber: '0987654321'
    },
];



const orderData = [
    {
        key: '1',
        orderId: '1234',
        customer: 'Mike',
        total: '$1200'
    },
    {
        key: '2',
        orderId: '5678',
        customer: 'John',
        total: '$800'
    },
];


const DashboardPage = () => {
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [recordToEdit, setRecordToEdit] = useState(null);
    const [recordToDelete, setRecordToDelete] = useState(null);
    const [selectedMenuKey, setSelectedMenuKey] = useState('sub1');
    const [dataSource, setDataSource] = useState([]);
    const [form] = Form.useForm();


    const [products, setProducts] = useState([]);
    const [category, setCategories] = useState([]);
    const [order, setOrder] = useState([]);

    const handleSelectChange = (value) => {
        console.log('Selected value:', value); // Kiểm tra giá trị được chọn
        form.setFieldsValue({ loaisanpham: value });
    };




    //Lấy loại sản phẩm
    useEffect(() => {
        axios.get('http://localhost:3001/products') // Gọi API để chỉ lấy sản phẩm 
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching kitchen products:', error);
            });
    }, []);

    // Lấy loại sản phẩm
    useEffect(() => {
        axios.get('http://localhost:3001/categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching kitchen products:', error);
            });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3001/getOrder')
            .then(response => {
                setOrder(response.data);
            })
            .catch(error => {
                console.error('Error fetching kitchen products:', error);
            });
    }, []);

    // Hàm xóa sản phẩm
    const deleteProduct = async (productId) => {
        try {
            const response = await axios.delete(`http://localhost:3001/deleteProduct/${productId}`);
            console.log(response.data); // Xem phản hồi từ server
        } catch (error) {
            console.error('Error deleting product:', error.response ? error.response.data : error.message);
        }
    };

    //Thêm loại sản phẩm
    const addCategory = (categoryData) => {
        axios.post('http://localhost:3001/loaisp', categoryData, {
            headers: {
                'Content-Type': 'multipart/form-data' // Đảm bảo header Content-Type là multipart/form-data khi gửi FormData
            }
        })
            .then(response => {
                // Xử lý khi request thành công
                console.log('Thêm loại sản phẩm thành công:', response.data);
                // Cập nhật state hoặc thực hiện các hành động khác sau khi thêm thành công
            })
            .catch(error => {
                // Xử lý khi có lỗi xảy ra
                console.error('Lỗi khi thêm loại sản phẩm:', error);
            });
    };


    //Thêm sản phẩm
    const addProduct = (productData) => {
        axios.post('http://localhost:3001/create', productData, {
            headers: {
                'Content-Type': 'multipart/form-data' // Đảm bảo header Content-Type là multipart/form-data khi gửi FormData
            }
        })
            .then(response => {
                // Xử lý khi thêm sản phẩm thành công
                console.log('Product added successfully:', response.data);
                // Cập nhật danh sách sản phẩm hoặc thực hiện các hành động khác sau khi thêm sản phẩm thành công
            })
            .catch(error => {
                // Xử lý khi có lỗi xảy ra
                console.error('Error adding product:', error);
            });


    };






    const handleAddModalOk = () => {
        form.validateFields().then(values => {
            if (selectedMenuKey === 'sub2-1') {
                const productData = new FormData();
                productData.append('ten_sanpham', values.ten_sanpham);
                productData.append('mo_ta', values.mo_ta);
                productData.append('gia', values.gia);
                productData.append('id_loaisanpham', values.id_loaisanpham);

                // Kiểm tra nếu file tồn tại trước khi thêm vào FormData
                if (values.file && values.file.fileList && values.file.fileList.length > 0) {
                    productData.append('file', values.file.fileList[0].originFileObj); // Lấy ra tệp ảnh từ fileList
                } else {
                    console.error('File không hợp lệ hoặc không tồn tại');
                    return;
                }

                addProduct(productData);
            } else if (selectedMenuKey === 'sub2-2') {
                const categoryData = new FormData();
                categoryData.append('ten_loaisp', values.ten_loaisp);
                if (values.file && values.file.fileList && values.file.fileList.length > 0) {
                    categoryData.append('file', values.file.fileList[0].originFileObj); // Lấy ra tệp ảnh từ fileList
                } else {
                    console.error('File không hợp lệ hoặc không tồn tại');
                    return;
                }
                addCategory(categoryData);
            }
            setAddModalVisible(false);
        }).catch(info => {
            console.log('Validate Failed:', info);
        });
    };

    const handleEdit = (record) => {
        setRecordToEdit(record);
        form.setFieldsValue(record);
        setEditModalVisible(true);
    };

    const handleDelete = (record) => {
        setRecordToDelete(record);
        setDeleteModalVisible(true);
    };

    const handleEditModalOk = () => {
        form.validateFields().then(values => {
            // Lấy id của sản phẩm cần cập nhật
            const id = recordToEdit.id; // Đảm bảo recordToEdit có chứa id sản phẩm

            // Gửi yêu cầu PUT đến server để cập nhật sản phẩm
            axios.put(`http://localhost:3001/updateProduct/${id}`, values)
                .then(response => {
                    // Xử lý phản hồi thành công
                    message.success('Cập nhật sản phẩm thành công!');
                    setEditModalVisible(false); // Đóng modal sau khi cập nhật thành công
                })
                .catch(error => {
                    // Xử lý lỗi
                    console.error('Có lỗi xảy ra:', error);
                    message.error('Cập nhật sản phẩm thất bại. Vui lòng thử lại!');
                });
        }).catch(info => {
            console.log('Validate Failed:', info);
        });
    };



    //Nút ok khi xóa
    const handleDeleteModalOk = () => {
        if (recordToDelete) {
            deleteProduct(recordToDelete.id); // Gọi hàm xóa với ID sản phẩm cần xóa
        }
    };
    //Nút cancel
    const handleModalCancel = () => {
        setEditModalVisible(false);
        setDeleteModalVisible(false);
        setAddModalVisible(false);
    };

    const handleMenuClick = ({ key }) => {
        setSelectedMenuKey(key);
        switch (key) {
            case 'sub1':
                setDataSource(userData);
                break;
            case 'sub2-1':
                setDataSource(products);
                break;
            case 'sub2-2':
                setDataSource(category);
                break;
            case 'sub3':
                setDataSource(order);
                break;
            default:
                break;
        }
    };

    const handleAddNewRecord = () => {
        setAddModalVisible(true);
        form.resetFields();
    };

    const userColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Actions',
            dataIndex: '',
            key: 'actions',
            render: (_, record) => (
                <span>
                    <Button type="link" icon={<EditOutlined />} style={{ marginRight: 16 }} onClick={() => handleEdit(record)}>Edit</Button>
                    <Button type="link" icon={<DeleteOutlined />} onClick={() => handleDelete(record)}>Delete</Button>
                </span>
            ),
        },
    ];

    const productColumns = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'ten_sanpham',
            key: 'ten_sanpham',
        },
        {
            title: 'Mô tả',
            dataIndex: 'mo_ta',
            key: 'mo_ta',
        },
        {
            title: 'Giá',
            dataIndex: 'gia',
            key: 'gia',
        },
        {
            title: 'ID Loại sản phẩm',
            dataIndex: 'id_loaisanpham',
            key: 'id_loaisanpham',
        },
        {
            title: 'Ảnh',
            dataIndex: 'anh',
            key: 'anh',
            render: (text, record) => (
                <img src={`/moho/public/images/${record.anh}`} alt={record.ten_sanpham} style={{ maxWidth: '100px' }} />

            ),
        },
        {
            title: 'Actions',
            dataIndex: '',
            key: 'actions',
            render: (_, record) => (
                <span>
                    <Button type="link" icon={<EditOutlined />} style={{ marginRight: 16 }} onClick={() => handleEdit(record)}>Edit</Button>
                    <Button type="link" icon={<DeleteOutlined />} onClick={() => handleDelete(record)}>Delete</Button>
                </span>
            ),
        },
    ];

    const CategoryColumns = [
        {
            title: 'ID',
            dataIndex: 'id_loaisanpham',
            key: 'id_loaisanpham',
        },
        {
            title: 'Loại sản phẩm',
            dataIndex: 'ten_loaisp',
            key: 'ten_loaisp',
        },
        {
            title: 'Ảnh',
            dataIndex: 'banner',
            key: 'banner',
            render: (text, record) => (
                <img src={`/moho/public/images/${record.banner}`} alt={record.ten_loaisp} style={{ maxWidth: '100px' }} />

            ),
        },
        {
            title: 'Actions',
            dataIndex: '',
            key: 'actions',
            render: (_, record) => (
                <span>
                    <Button type="link" icon={<EditOutlined />} style={{ marginRight: 16 }} onClick={() => handleEdit(record)}>Edit</Button>
                    <Button type="link" icon={<DeleteOutlined />} onClick={() => handleDelete(record)}>Delete</Button>
                </span>
            ),
        },
    ];

    const orderColumns = [
        {
            title: 'Order ID',
            dataIndex: 'id_order',
            key: 'id_order',
        },
        {
            title: 'Customer',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Address',
            dataIndex: 'detailed_address',

            key: 'detailed_address',
        },
        {
            title: 'Total',
            dataIndex: 'total_price',
            key: 'total',
        },
        {
            title: 'Actions',
            dataIndex: '',
            key: 'actions',
            render: (_, record) => (
                <span>
                    <Button type="link" icon={<EditOutlined />} style={{ marginRight: 16 }} onClick={() => handleEdit(record)}>Edit</Button>
                    <Button type="link" icon={<DeleteOutlined />} onClick={() => handleDelete(record)}>Delete</Button>
                </span>
            ),
        },
    ];

    const getColumns = () => {
        switch (selectedMenuKey) {
            case 'sub1':
                return userColumns;
            case 'sub2-1':
                return productColumns;
            case 'sub2-2':
                return CategoryColumns;
            case 'sub3':
                return orderColumns;

            default:
                return [];
        }
    };

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout>
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <div className="demo-logo">
                    <img src={AdminImage} alt="Logo" style={{ width: '200px', marginTop: '20px' }} />
                </div>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} style={{ flex: 1, minWidth: 0 }} />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar size="default" icon={<UserOutlined />} alt="User Avatar" style={{ marginRight: 16 }} />
                    <Text style={{ color: '#fff' }}>Lê Tiến Phát</Text>
                </div>
            </Header>
            <Content style={{ padding: '0 48px' }}>
                <Breadcrumb style={{ margin: '16px 0' }} />
                <Layout style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG }}>
                    <Sider style={{ background: colorBgContainer }} width={200}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['sub1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%' }}
                            items={items2}
                            onClick={handleMenuClick} // Handle menu click
                        />
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: '77vh' }}>
                        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddNewRecord} style={{ marginBottom: 16 }}>
                            Add New
                        </Button>
                        <Table
                            dataSource={dataSource}
                            columns={getColumns()}
                            pagination={false}
                            rowSelection={{
                                type: 'checkbox',
                                onSelectAll: (selected, selectedRows, changeRows) => {
                                    console.log(selected, selectedRows, changeRows);
                                },
                            }}
                        />

                    </Content>
                </Layout>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                PTGAMING ©{new Date().getFullYear()} Created by Ant UED
            </Footer>

            <Modal
                title="Chỉnh Sửa"
                visible={editModalVisible}
                onOk={handleEditModalOk}
                onCancel={handleModalCancel}
            >
                <Form form={form} layout="vertical">
                    {selectedMenuKey === 'sub1' && (
                        <>
                            <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the name!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="age" label="Age" rules={[{ required: true, message: 'Please input the age!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="address" label="Address" rules={[{ required: true, message: 'Please input the address!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="phoneNumber" label="Phone Number" rules={[{ required: true, message: 'Please input the phone number!' }]}>
                                <Input />
                            </Form.Item>
                        </>
                    )}
                    {selectedMenuKey === 'sub2-1' && (
                        <>
                            <Form.Item name="ten_sanpham" label="Tên sản phẩm" rules={[{ required: true, message: 'Please input the name!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="mo_ta" label="Mô tả" rules={[{ required: true, message: 'Please input the price!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="gia" label="Giá" rules={[{ required: true, message: 'Please input the stock!' }]}>
                                <Input />
                            </Form.Item>
                            {/* <Form.Item
                                name="id_loaisanpham"
                                label="Loại sản phẩm"
                                rules={[{ required: true, message: 'Please select a category!' }]}
                            >
                                <Select
                                    placeholder="Chọn loại sản phẩm"
                                    onChange={handleSelectChange}
                                >
                                    {category.map((category) => (
                                        <Option key={category.id_loaisanpham} value={category.id_loaisanpham}>
                                            {category.ten_loaisp}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item name="anh" label="anh" rules={[{ required: true, message: 'Please input the stock!' }]}>
                                <Upload

                                >
                                    <Button icon={<UploadOutlined />}>Click để tải lên</Button>
                                </Upload>
                            </Form.Item> */}
                        </>
                    )}
                    {selectedMenuKey === 'sub2-2' && (
                        <Form.Item name="ten_loaisanpham" label="Tên loại sản phẩm" rules={[{ required: true, message: 'Vui lòng nhập tên loại sản phẩm!' }]}>
                            <Input />

                        </Form.Item>

                    )}

                    {selectedMenuKey === 'sub3' && (
                        <>
                            <Form.Item name="orderId" label="Order ID" rules={[{ required: true, message: 'Please input the order ID!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="customer" label="Customer" rules={[{ required: true, message: 'Please input the customer!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="total" label="Total" rules={[{ required: true, message: 'Please input the total!' }]}>
                                <Input />
                            </Form.Item>
                        </>
                    )}
                </Form>
            </Modal>

            <Modal
                title="Xóa"
                visible={deleteModalVisible}
                onOk={handleDeleteModalOk}
                onCancel={handleModalCancel}
            >
                <p>Bạn có chắc chắn muốn xóa bản ghi này không?</p>
            </Modal>

            <Modal
                title="Thêm Mới"
                visible={addModalVisible}
                onOk={handleAddModalOk}
                onCancel={handleModalCancel}
            >
                <Form form={form} layout="vertical">
                    {selectedMenuKey === 'sub2-1' && (
                        <>
                            <Form.Item name="ten_sanpham" label="Tên sản phẩm" rules={[{ required: true, message: 'Please input the name!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="mo_ta" label="Mô tả" rules={[{ required: true, message: 'Please input the description!' }]}>
                                {/* Use ReactQuill for rich text editor */}
                                <ReactQuill
                                    
                                   
                                    placeholder="Mô tả sản phẩm"
                                />
                            </Form.Item>
                            <Form.Item name="gia" label="Giá" rules={[{ required: true, message: 'Please input the price!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="id_loaisanpham"
                                label="Loại sản phẩm"
                                rules={[{ required: true, message: 'Please select a category!' }]}
                            >
                                <Select
                                    placeholder="Chọn loại sản phẩm"
                                    onChange={handleSelectChange}
                                >
                                    {category.map((category) => (
                                        <Option key={category.id_loaisanpham} value={category.id_loaisanpham}>
                                            {category.ten_loaisp}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item name="file" label="Ảnh" rules={[{ required: true, message: 'Vui lòng tải lên một hình ảnh!' }]}>
                                <Upload
                                    beforeUpload={() => false} // Ngăn chặn tự động tải lên
                                    listType="picture"
                                    onChange={info => form.setFieldsValue({ file: info })}
                                >
                                    <Button icon={<UploadOutlined />}>Click để tải lên</Button>
                                </Upload>

                            </Form.Item>
                        </>
                    )}
                    {selectedMenuKey === 'sub2-2' && (
                        <>
                            <Form.Item name="ten_loaisp" label="Tên loại sản phẩm" rules={[{ required: true, message: 'Vui lòng nhập tên loại sản phẩm!' }]}>
                                <Input />

                            </Form.Item>
                            <Form.Item name="file" label="Ảnh" rules={[{ required: true, message: 'Vui lòng tải lên một hình ảnh!' }]}>
                                <Upload
                                    beforeUpload={() => false} // Ngăn chặn tự động tải lên
                                    listType="picture"
                                    onChange={info => form.setFieldsValue({ file: info })}
                                >
                                    <Button icon={<UploadOutlined />}>Click để tải lên</Button>
                                </Upload>

                            </Form.Item>
                        </>


                    )}
                </Form>
            </Modal>


        </Layout>
    );
};



export default DashboardPage;