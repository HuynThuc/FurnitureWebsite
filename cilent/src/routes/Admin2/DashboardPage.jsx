import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet, useNavigate } from 'react-router-dom';
import { LaptopOutlined, NotificationOutlined, UserOutlined, PlusOutlined } from '@ant-design/icons';
import { EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { Avatar, Breadcrumb, Layout, Menu, Typography, theme, Table, Modal, Form, Input, Button, Select, Upload, message } from 'antd';
import AdminImage from '../../images/logo-moho.webp';
import ReactQuill from 'react-quill';
import OrderPage from './OrderDetail';
import 'react-quill/dist/quill.snow.css';
// Đảm bảo bạn đã cài đặt react-toastify 
// Import Quill styles

import '../Admin2/DashboardPage.css';


const { Option } = Select;
const { Header, Content, Footer, Sider } = Layout;
const { Text } = Typography;


// Đây là danh sách các mục menu cho phần điều hướng bên trái của trang Dashboard. Mỗi mục có một key, icon, và label để xác định và hiển thị trong menu.
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





const DashboardPage = () => {
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [orderModalVisible, setOrderModalVisible] = useState(false);
    const [recordToOrder, setRecordOrder] = useState(null);
    const [recordToEdit, setRecordToEdit] = useState(null);
    const [recordToDelete, setRecordToDelete] = useState(null);
    const [selectedMenuKey, setSelectedMenuKey] = useState('sub1');
    const [dataSource, setDataSource] = useState([]);
    const [form] = Form.useForm();


    const [products, setProducts] = useState([]);
    const [category, setCategories] = useState([]);
    const [order, setOrder] = useState([]);
    const navigate = useNavigate();

    const statusColors = {
        'Đang xử lý': 'bg-yellow-200 text-yellow-800',
        'Đang giao hàng': 'bg-blue-200 text-blue-800',
        'Hoàn thành': 'bg-green-200 text-green-800',
        'Đã hủy': 'bg-red-200 text-red-800',
    };



    const validatePrice = (_, value) => {
        if (value < 0) {
            return Promise.reject(new Error('Vui lòng nhập giá hợp lệ!'));
        }
        return Promise.resolve();
    };


    //Lấy sản  phẩm
    const fetchProduct = async () => {
        try {
            const response = await axios.get('http://localhost:3001/products'); // Gọi API để lấy sản phẩm
            setProducts(response.data); // Cập nhật state với dữ liệu sản phẩm
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    useEffect(() => {
        fetchProduct();
    }, []);

    //Lấy loại sản  phẩm
    const fetchCategory = async () => {
        try {
            const response = await axios.get('http://localhost:3001/categories')
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching category:', error);

        }

    }
    // Lấy loại sản phẩm
    useEffect(() => {
        fetchCategory();
    }, []);


    

    //Lấy order detail
    const handleViewOrderDetail = (id_order) => {
        axios.get(`http://localhost:3001/getOrderDetail/${id_order}`)
            .then(response => {
                setRecordOrder(response.data); // Lưu thông tin chi tiết đơn hàng vào state
                setOrderModalVisible(true); // Hiển thị Modal sau khi lưu dữ liệu thành công
            })
            .catch(error => {
                console.error('Error fetching order details:', error);
            });
    };

    //Xóa loại sản phẩm
    const deleteCategory = async (categoryId) => {
        try {
            const response = await axios.delete(`http://localhost:3001/deleteCategory/${categoryId}`);
            console.log(response.data); // Xem phản hồi từ server
            if (response.status === 200) {
                fetchCategory();
            }
        } catch (error) {
            console.error('Error deleting product:', error.response ? error.response.data : error.message);
        }
    };




    const fetchOrder = async () => {
        try {
            const response = await axios.get('http://localhost:3001/getOrder')
            setOrder(response.data);
        } catch (error) {
            console.error('Error fetching category:', error);

        }

    }
    // Lấy loại sản phẩm
    useEffect(() => {
        fetchOrder();
    }, []);

    // Hàm xóa sản phẩm
    const deleteProduct = async (productId) => {
        try {
            const response = await axios.delete(`http://localhost:3001/deleteProduct/${productId}`);
            console.log(response.data); // Xem phản hồi từ server
            if (response.status === 200) {
                fetchProduct();
            }
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
                fetchCategory();
                // Cập nhật state hoặc thực hiện các hành động khác sau khi thêm thành công
            })
            .catch(error => {
                // Xử lý khi có lỗi xảy ra
                console.error('Lỗi khi thêm loại sản phẩm:', error);
            });
    };

    //Thêm sản phẩm
    // Thêm sản phẩm
    const addProduct = (productData) => {
        axios.post('http://localhost:3001/create', productData, {
            headers: {
                'Content-Type': 'multipart/form-data' // Đảm bảo header Content-Type là multipart/form-data khi gửi FormData
            }
        })
            .then(response => {
                // Kiểm tra phản hồi từ server
                if (response.data.Error) {
                    console.error(response.data.Error); // In ra thông báo lỗi nếu có
                    alert(response.data.Error); // Hoặc bạn có thể sử dụng alert hoặc hiển thị thông báo lỗi trên UI
                } else {
                    // Xử lý khi thêm sản phẩm thành công
                    console.log('Product added successfully:', response.data);
                    fetchProduct(); // Cập nhật danh sách sản phẩm sau khi thêm thành công
                }
            })
            .catch(error => {
                // Xử lý khi có lỗi xảy ra
                console.error('Error adding product:', error);
                alert('Error adding product');
            });
    };

    //nút edit
    const handleEdit = (record) => {
        setRecordToEdit(record);
        form.setFieldsValue(record);
        setEditModalVisible(true);
    };

    const handleOrder = (record) => {
        setRecordOrder(record); // Lưu thông tin đơn hàng vào state
        handleViewOrderDetail(record.id_order); // Gọi API để lấy chi tiết đơn hàng
    };

    //nút xóa
    const handleDelete = (record) => {
        setRecordToDelete(record);
        setDeleteModalVisible(true);
    };

    //đóng modal orderview
    const handleCloseModal = () => {
        setOrderModalVisible(false);
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


    //nút ok khi thêm 
    const handleAddModalOk = () => {
        // Xác thực dữ liệu nhập từ form và lấy các giá trị.
        form.validateFields().then(values => {
            if (selectedMenuKey === 'sub2-1') {
                // Tạo một đối tượng FormData để chứa dữ liệu sản phẩm, bao gồm cả các tệp đính kèm.
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
                fetchProduct();



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
                fetchCategory();
            }
            setAddModalVisible(false);


        }).catch(info => {
            console.log('Validate Failed:', info);
        });
    };
    //Nút ok khi xóa
    const handleDeleteModalOk = () => {
        if (recordToDelete) {
            try {

                // Xóa dữ liệu từ server
                switch (selectedMenuKey) {
                    case 'sub2-1':
                        deleteProduct(recordToDelete.id);

                        // Xóa người dùng
                        break;
                    case 'sub2-2':
                        deleteCategory(recordToDelete.id_loaisanpham);

                        // Xóa người dùng
                        break;
                    default:
                        break;
                }
            } catch (error) {
                console.error('Error deleting data:', error);
            }
            setDeleteModalVisible(false);

        }

    };
    //Nút cancel
    const handleModalCancel = () => {
        setEditModalVisible(false);
        setDeleteModalVisible(false);
        setAddModalVisible(false);
        setOrderModalVisible(false)
    };


    const handleMenuClick = ({ key }) => {
        setSelectedMenuKey(key);
    };
    //Hàm lưu dữ liệu datasource
    useEffect(() => {
        switch (selectedMenuKey) {
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
    }, [selectedMenuKey, userData, category, products, order]);

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
            title: 'Giá',
            dataIndex: 'gia',
            key: 'gia',
            render: (gia) => {
                if (typeof gia === 'number') {
                    return gia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                }
            },
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
                <img src={`/images/${record.anh}`} alt={record.ten_sanpham} style={{ maxWidth: '100px' }} />

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
                <img src={`images/${record.banner}`} alt={record.ten_loaisp} style={{ maxWidth: '100px' }} />

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
            title: 'Mã đơn',
            dataIndex: 'id_order',
            key: 'id_order',
        },
        {
            title: 'Ngày tạo đơn',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'Khách hàng',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Phương thức thanh toán',
            dataIndex: 'paymentMethod',
            key: 'paymentMethod',
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'total_price',
            key: 'total',
            render: (total_price) => {
                if (typeof total_price === 'number') {
                    return total_price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                }
            },
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <div
                    className={`inline-block px-4 py-1 rounded-md ${statusColors[status] || 'bg-gray-200 text-gray-800'}`}
                >
                    {status}
                </div>
            ),

        },

        {
            title: 'Actions',
            dataIndex: '',
            key: 'actions',
            render: (_, record) => (
                <span>
                    <Button type="link" icon={<EditOutlined />} style={{ marginRight: 16 }} onClick={() => handleOrder(record)}>Order</Button>
                    <Button type="link" icon={<DeleteOutlined />} onClick={() => handleDelete(record)}>Delete</Button>
                </span>
            ),
        },
    ];


    //lấy bảng
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
                            //Lấy menu
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
                        <Form.Item name="ten_loaisp" label="Tên loại sản phẩm" rules={[{ required: true, message: 'Vui lòng nhập tên loại sản phẩm!' }]}>
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
                            <Form.Item
                                name="gia"
                                label="Giá"
                                rules={[
                                    { required: true, message: 'Please input the price!' },
                                    { validator: validatePrice }
                                ]}
                            >
                                <Input type="number" />
                            </Form.Item>
                            <Form.Item
                                name="id_loaisanpham"
                                label="Loại sản phẩm"
                                rules={[{ required: true, message: 'Please select a category!' }]}
                            >
                                <Select
                                    placeholder="Chọn loại sản phẩm"

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

            <Modal
                title="Order Details"
                visible={orderModalVisible}
                onCancel={handleModalCancel}
                footer={null} // Không hiển thị các nút footer nếu không cần thiết
                width={1250} // Đặt chiều rộng của Modal nếu cần
            >
                {recordToOrder ? (
                    <OrderPage
                        order={recordToOrder}
                        onStatusUpdateSuccess={handleCloseModal}
                        fetchOrder={fetchOrder}
                    />
                ) : (
                    <p>Loading...</p>
                )}
            </Modal>

            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar
            />


        </Layout>
    );
};



export default DashboardPage;