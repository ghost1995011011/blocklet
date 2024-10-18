import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Button, Card, Form, Row, Col, message } from 'antd';

function Profile() {
  const [profile, setProfile] = useState({ username: '', email: '', phone: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    axios.get('/api/profile')
      .then(response => {
        setProfile(response.data);
        form.setFieldsValue(response.data);  // Set initial form values
      })
      .catch(error => {
        message.error("Error fetching profile");
        console.error("Error fetching profile", error);
      });
  }, [form]);

  const handleSave = () => {
    form.validateFields()
      .then(values => {
        setLoading(true);
        axios.post('/api/profile', values)
          .then(() => {
            setProfile(values);
            setIsEditing(false);
            message.success('Profile saved successfully');
          })
          .catch(error => {
            message.error("Error saving profile");
            console.error("Error saving profile", error);
          })
          .finally(() => setLoading(false));
      })
      .catch(errorInfo => {
        console.error("Validation failed", errorInfo);
      });
  };

  return (
    <Card title="User Profile" style={{ maxWidth: 600, margin: 'auto' }}>
      <Form layout="vertical" form={form}>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please enter your username' }]}
            >
              <Input disabled={!isEditing} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' }
              ]}
            >
              <Input disabled={!isEditing} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: 'Please enter your phone number' }]}
            >
              <Input disabled={!isEditing} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item>
              {isEditing ? (
                <Button type="primary" onClick={handleSave} loading={loading}>
                  Save
                </Button>
              ) : (
                <Button type="default" onClick={() => setIsEditing(true)}>
                  Edit
                </Button>
              )}
              {isEditing && (
                <Button style={{ marginLeft: 8 }} onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}

export default Profile;
