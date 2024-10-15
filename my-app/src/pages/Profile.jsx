import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Button, Card, Form, Row, Col } from 'antd';

function Profile() {
  const [profile, setProfile] = useState({ username: '', email: '', phone: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get('/api/profile')
      .then(response => {
        setProfile(response.data);
      })
      .catch(error => {
        console.error("Error fetching profile", error);
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfile(prevProfile => ({ ...prevProfile, [name]: value }));
  };

  const handleSave = () => {
    setLoading(true);
    axios.post('/api/profile', profile)
      .then(() => {
        setIsEditing(false);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error saving profile", error);
        setLoading(false);
      });
  };

  return (
    <Card title="User Profile" style={{ maxWidth: 600, margin: 'auto' }}>
      <Form layout="vertical">
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Username">
              {isEditing ? (
                <Input
                  name="username"
                  value={profile.username}
                  onChange={handleInputChange}
                />
              ) : (
                <span>{profile.username}</span>
              )}
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Email">
              {isEditing ? (
                <Input
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                />
              ) : (
                <span>{profile.email}</span>
              )}
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Phone">
              {isEditing ? (
                <Input
                  name="phone"
                  value={profile.phone}
                  onChange={handleInputChange}
                />
              ) : (
                <span>{profile.phone}</span>
              )}
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
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}

export default Profile;
