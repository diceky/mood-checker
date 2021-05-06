import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Styles from "./Admin.module.css";
import { useParams, Link } from "react-router-dom";
import BarChart from "../components/BarChart";
import HandPosition from "../components/HandPosition";

const Admin = () => {
  const { id } = useParams();
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (id.length === 6 && !isNaN(id)) {
      setIsValid(true);
    }
  }, [id]);

  return (
    <Layout>
      {isValid ? (
        <Row>
          <Row>
            <Col md={{ span: 10, offset: 1 }}>
              <BarChart />
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 10, offset: 1 }}>
              <HandPosition />
            </Col>
          </Row>
        </Row>
      ) : (
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <h2>Invalide Room ID</h2>
          </Col>
        </Row>
      )}
    </Layout>
  );
};

export default Admin;
