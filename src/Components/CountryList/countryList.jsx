import { useState, useEffect, useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getCountry } from "../../store/actions";
import { Table, Button, Modal, Form, Row, Col } from "react-bootstrap";
import Classes from "./country.module.scss";
// import { useGoogleMaps } from "react-hook-google-maps";
import OutLink from "../Utilities/Links/OutLink";
import * as yup from "yup";
const schema = yup.object().shape({
  conutryName: yup
    .string()
    .min(3, "Country Name must be bigger than 3 charctars")
    .required("this field is required"),
  conutryCapital: yup
    .string()
    .min(3, "Country Name must be bigger than 3 charctars")
    .required("this field is required"),
  conutryRegin: yup
    .string()
    .min(3, "Country Name must be bigger than 3 charctars")
    .required("this field is required"),
  conutryPopulation: yup
    .number()
    .min(2, "Country Name must be bigger than 3 charctars")
    .required("this field is required"),
  countryPositionName: yup
    .string()
    .min(3, "Country Name must be bigger than 3 charctars")
    .required("this field is required"),
  countryPositionLat: yup
    .number()
    .min(2, "Country Name must be bigger than 3 charctars")
    .required("this field is required"),
  countryPositionLng: yup
    .number()
    .min(2, "Country Name must be bigger than 3 charctars")
    .required("this field is required"),
  flag: yup
    .mixed()
    .required("you need to provied a file")
    .test("fileSize", "the file is too larg", (value) => {
      return value && value[0].size <= 2000000;
    })
    .test("type", "we only support jpeg", (value) => {
      return value && value[0].type === "image/jpeg";
    }),
});

export default function CountryList(props) {
  const [headsState, setHeadsState] = useState([
    {
      id: "_1",
      text: "Country Name",
    },
    {
      id: "_2",
      text: "Capital",
    },
    {
      id: "_3",
      text: "flag",
    },
    {
      id: "_4",
      text: "Region",
    },
    {
      id: "_5",
      text: "Population",
    },
    {
      id: "_6",
      text: "Position",
    },
    {
      id: "_7",
      text: "Options",
    },
  ]);
  const [tableData, setTableData] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const formCountryNameRef = useRef();

  const [newData, setNewData] = useState([]);

  const [editCountryData, setEditCountryData] = useState({
    countryName: "",
    conutryCapital: "",
    countryRegin: "tbData.region",
    flag: "",
    countryPopulation: "",
    countryPositionName: "tbData.name",
    countryPositionLat: 0,
    countryPositionLng: 0,
  });

  const { register, handleSubmit, errors, onChange } = useForm({
    validationSchema: schema,
  });

  const onSubmitHandler = ({
    conutryName,
    conutryCapital,
    countryRegin,
    countryPopulation,
    countryPositionName,
    flag,
    countryPositionLat,
    countryPositionLng,
  }) => {
    setNewData([
      ...newData,
      {
        id: Math.random(),
        countryName: conutryName,
        conutryCapital: conutryCapital,
        countryRegin: countryRegin,
        countryPopulation: countryPopulation,
        countryPositionName: countryPositionName,
        flag: flag[0].name,
        countryPositionLat: countryPositionLat,
        countryPositionLng: countryPositionLng,
      },
    ]);
  };

  const countryData = useSelector((state) => state.addCountry);
  const dispatch = useDispatch();

  const getAllCountry = useCallback(() => {
    //Get countries:
    dispatch(getCountry());
    // Set Countries Data
    // setTableData(countryData.allCountry);
  }, [dispatch]);

  const handleClick = useCallback(() => {
    setTableData(countryData.allCountry);
  },[countryData]);

  useEffect(() => {
    getAllCountry();
    handleClick();
  }, [getAllCountry, handleClick]);



  let tableList;
  if (tableData) {
    tableList = tableData.map((tbData) => {
      return (
        <tr key={Math.random()}>
          <td className={Classes.Table_body_td}>{tbData.name}</td>
          <td className={Classes.Table_body_td}>{tbData.capital}</td>
          <td className={Classes.Table_body_td}>
            <img
              src={tbData.flag}
              alt="Country Flag"
              className={`img-fluid ${Classes.Table_body_td_img}`}
            />
          </td>
          <td className={Classes.Table_body_td}>{tbData.region}</td>
          <td className={Classes.Table_body_td}>{tbData.population}</td>
          <td className={Classes.Table_body_td}>
            <OutLink
              target="_blank"
              href={`https://www.google.com/maps/place/${tbData.name}/@${tbData.latlng[0]},${tbData.latlng[1]}`}
            >
              Go to map
            </OutLink>
          </td>
          <td className={Classes.Table_body_td}>
            <div className="d-flex align-items-center">
              <Button
                variant="warning"
                className="me-2"
                onClick={() => {
                  setEditCountryData({
                    countryName: tbData.name,
                    conutryCapital: tbData.capital,
                    countryRegin: tbData.region,
                    flag: tbData.flag,
                    countryPopulation: tbData.population,
                    countryPositionName: tbData.name,
                    countryPositionLat: tbData.latlng[0],
                    countryPositionLng: tbData.latlng[1],
                  });
                  handleShow2();
                  console.log(tbData.capital);
                }}
              >
                Edit
              </Button>
            </div>
          </td>
        </tr>
      );
    });
  }

  let newDataList;
  if (newData) {
    newDataList = newData.map((newDataL) => {
      return (
        <tr key={Math.random()}>
          <td className={Classes.Table_body_td}>{newDataL.countryName}</td>
          <td className={Classes.Table_body_td}>{newDataL.conutryCapital}</td>
          <td className={Classes.Table_body_td}>
            <img
              src={newDataL.flag}
              alt={newDataL.flag}
              className={`img-fluid ${Classes.Table_body_td_img}`}
            />
          </td>
          <td className={Classes.Table_body_td}>{newDataL.countryRegin}</td>
          <td className={Classes.Table_body_td}>
            {newDataL.countryPopulation}
          </td>
          <td className={Classes.Table_body_td}>
            <OutLink
              target="_blank"
              href={`https://www.google.com/maps/place/${newDataL.countryPositionName}/@${newDataL.countryPositionLat},${newDataL.countryPositionLng}`}
            >
              Go to map
            </OutLink>
          </td>
          <td className={Classes.Table_body_td}>
            <div className="d-flex align-items-center justify-content-center">
              <Button variant="warning" className="me-2">
                Edit
              </Button>
            </div>
          </td>
        </tr>
      );
    });
  }

  const editHandleChange = (e) => {
    e.preventDefault();
    setEditCountryData({
      countryName: formCountryNameRef.current.value,
    });
  };

  return (
    <>
      {/* <div ref={ref} style={{ width: 400, height: 300 }} /> */}
      <div className="text-center">
        <Button variant="success" onClick={handleShow}>
          Add New Country
        </Button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Country</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmitHandler)}>
            <Form.Group className="mb-3" controlId="conutryName">
              <Form.Label>Country Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Type Your Country Name"
                {...register("conutryName")}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="conutryCapital">
              <Form.Label>Country Capital</Form.Label>
              <Form.Control
                type="text"
                placeholder="Type Your Country Capital"
                {...register("conutryCapital")}
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Country Flag</Form.Label>
              <Form.Control type="file" {...register("flag")} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="countryRegin">
              <Form.Label>Country Regin</Form.Label>
              <Form.Control
                type="text"
                placeholder="Type Your Country Regin"
                {...register("countryRegin")}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="countryPopulation">
              <Form.Label>Country Population</Form.Label>
              <Form.Control
                type="number"
                placeholder="Type Your Country Population"
                {...register("countryPopulation")}
              />
            </Form.Group>
            <h5 className="h5">Country Position</h5>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="countryPositionName">
                  <Form.Label>Country Position Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Type Your Country Position Name"
                    {...register("countryPositionName")}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="countryPositionLat">
                  <Form.Label>Country Position Lat</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Type Your Country Position Lat"
                    {...register("countryPositionLat")}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="countryPositionLng">
                  <Form.Label>Country Position Lng</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Type Your Country Position Lng"
                    {...register("countryPositionLng")}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Button id='clicked' onClick={handleClick}>click me</Button>
      <Table responsive="sm" className={Classes.Table}>
        <thead className={Classes.Table_head}>
          <tr>
            {headsState.map((head) => {
              return (
                <th key={head.id} className={Classes.Table_head_th}>
                  {head.text}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className={Classes.Table_body}>
          {tableList} {newDataList}
        </tbody>
      </Table>

      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Country</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmitHandler)}>
            <Form.Group className="mb-3" controlId="conutryName">
              <Form.Label>Country Name</Form.Label>
              <Form.Control
                type="text"
                // placeholder="Type Your Country Name"
                value={editCountryData.countryName}
                onChange={editHandleChange}
                ref={formCountryNameRef}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="conutryCapital">
              <Form.Label>Country Capital</Form.Label>
              <Form.Control
                type="text"
                // placeholder="Type Your Country Capital"
                value={editCountryData.conutryCapital}
                {...register("conutryCapital")}
              />
            </Form.Group>
            <Form.Group controlId="flag" className="mb-3">
              <Form.Label>Country Flag</Form.Label>
              <Form.Control type="file" {...register("flag")} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="countryRegin">
              <Form.Label>Country Regin</Form.Label>
              <Form.Control
                type="text"
                // placeholder="Type Your Country Regin"
                value={editCountryData.countryRegin}
                {...register("countryRegin")}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="countryPopulation">
              <Form.Label>Country Population</Form.Label>
              <Form.Control
                type="number"
                // placeholder="Type Your Country Population"
                value={editCountryData.countryPopulation}
                {...register("countryPopulation")}
              />
            </Form.Group>
            <h5 className="h5">Country Position</h5>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="countryPositionName">
                  <Form.Label>Country Position Name</Form.Label>
                  <Form.Control
                    type="text"
                    // placeholder="Type Your Country Position Name"
                    value={editCountryData.countryName}
                    {...register("countryPositionName")}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="countryPositionLat">
                  <Form.Label>Country Position Lat</Form.Label>
                  <Form.Control
                    type="number"
                    // placeholder="Type Your Country Position Lat"
                    value={editCountryData.countryPositionLat}
                    {...register("countryPositionLat")}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="countryPositionLng">
                  <Form.Label>Country Position Lng</Form.Label>
                  <Form.Control
                    type="number"
                    // placeholder="Type Your Country Position Lng"
                    value={editCountryData.countryPositionLng}
                    {...register("countryPositionLng")}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
