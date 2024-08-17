import React from 'react';
import { Button, Form, Input, Typography, Layout, Row, Col, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; // Thay thế useHistory bằng useNavigate

import './LoginPage.css';

const { Title, Text } = Typography;
const { Content } = Layout;

const LoginPage = ({ onLogin }) => {
    const navigate = useNavigate(); // Thay thế useHistory bằng useNavigate

    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        if (await onLogin(values.username, values.password)) {
            navigate('/admin-2'); // Sử dụng navigate thay vì history.push
        }
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Content>
                <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
                    <Col xs={24} sm={16} md={12} lg={8}>
                        <div className="login-page-container">
                            <Title level={2} className="login-page-title">Đăng Nhập</Title>
                            <Form
                                name="login_form"
                                className="login-page-form"
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                            >
                                <Form.Item
                                    name="username"
                                    rules={[{ required: true, message: 'Vui lòng nhập Tên đăng nhập!' }]}
                                >
                                    <Input prefix={<UserOutlined className="login-page-ant-icon" />} placeholder="Tên đăng nhập" className="login-page-ant-input" />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: 'Vui lòng nhập Mật khẩu!' }]}
                                >
                                    <Input
                                        prefix={<LockOutlined className="login-page-ant-icon" />}
                                        type="password"
                                        placeholder="Mật khẩu"
                                        className="login-page-ant-input"
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Checkbox>Keep me logged in</Checkbox>
                                    <Text type="secondary" style={{ float: 'right' }}>Forgot password?</Text>
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="login-page-form-button" block>
                                        Đăng Nhập
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default LoginPage;
