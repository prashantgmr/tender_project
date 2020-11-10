import React, {useReducer, useState, useContext} from 'react'
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Label,
    Container,
    Row, Col

} from "reactstrap";
import { useForm } from "react-hook-form";
import DatePicker from "reactstrap-date-picker";
import Header from "../../components/Headers/Header.js";
import { NepaliDatePicker } from "nepali-datepicker-reactjs"
import "nepali-datepicker-reactjs/dist/index.css"
import axios from 'axios';
import { GlobalContext } from '../../context/GlobalContext.js';


export default function AddTender() {
    const { register, handleSubmit, errors } = useForm();
    const { addedTender ,error} = useContext(GlobalContext)
    console.log(error && error.map(item=>item))
     const [pubdate, setPubDate] = useState("")
     const [subdate, setSubDate] = useState("")
     const [ad, setAD]=useState(false)
    
    const onSubmit = (data) => {
        let newTender = new FormData();
        newTender.append("ProjectTitle",data.projectTitle);
        newTender.append("IFBNo",data.ifbNo);
        newTender.append("Procurement",data.procurement);
        newTender.append("PublicEntity",data.publicentity);
        newTender.append("PublicAddress",data.projectaddress);
        newTender.append("noticepubdate",pubdate);
        newTender.append("bidsubdate",subdate);
        newTender.append("dateAD", ad)
        newTender.append("status", "");
        console.log(newTender)
             addedTender(newTender)
    }

   
    return (
        <>
            <Header />
            <Container className="mt-n4" fluid>
                <Row>
                    <Col className="order-xl-1" xl="12">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">Add Tender</h3>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody className="tender_form">
                                <form onSubmit={handleSubmit(onSubmit)} method="POST" encType="multipart/form-data">
                                    {/* <h6 className="heading-small text-muted mb-4">
                                    Project information
                                    </h6> */}
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-project-title"
                                        >
                                            Project Title
                                         </label>
                                         <div>
                                        <input
                                            className="form-control-alternative form-control"
                                            // defaultValue="lucky.jesse"
                                            id="input-project-title"
                                            name="projectTitle"
                                            placeholder="Enter project Title"
                                            type="text"
                                            ref={register}
                                        />
                                        {error && <span className="text-danger error">{error.ProjectTitle}</span>}
                                        </div>
                                    </FormGroup>
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-ifb"
                                        >
                                            IFB NO:
                                        </label>
                                        <div>
                                        <input
                                            className="form-control-alternative form-control"
                                            id="input-ifb"
                                            placeholder="Enter IFB NO"
                                            type="text"
                                            ref ={register}
                                            name="ifbNo"
                                        />
                                         {error && <span className="text-danger error">{error.IFBNo}</span>}
                                         </div>
                                    </FormGroup>
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-Procurement"
                                        >
                                            Procurement Method
                                        </label>
                                        <div>
                                        <input
                                            className="form-control-alternative form-control"
                                            // defaultValue="Lucky"
                                            id="input-Procurement"
                                            placeholder="Enter Procurement Method"
                                            type="text"
                                            ref={register}
                                            name="procurement"
                                        />
                                        {error && <span className="text-danger error">{error.Procurement}</span>}
                                        </div>
                                    </FormGroup>
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-public-entity"
                                        >
                                            Public Entity
                                        </label>
                                        <div>
                                        <input
                                            className="form-control-alternative form-control"
                                            // defaultValue="Jesse"
                                            id="input-public-entity"
                                            placeholder="Enter Public Entity"
                                            type="text"
                                            ref={register}
                                            name="publicentity"
                                        />
                                        {error && <span className="text-danger error">{error.PublicEntity}</span>}
                                        </div>
                                    </FormGroup>
                                    {/* <h6 className="heading-small text-muted mb-4">
                                    Project Address
                                    </h6> */}
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-project-address"
                                        >
                                            Project Address
                                        </label>
                                        <div>
                                        <input
                                            className="form-control-alternative form-control"
                                            // defaultValue="Jesse"
                                            id="input-project-address"
                                            placeholder="Enter Public Entity"
                                            type="text"
                                            ref={register}
                                            name="projectaddress"
                                        />
                                        {error && <span className="text-danger error">{error.PublicAddress}</span>}
                                        </div>
                                        {/* <Input type="select" name="province" id="province" ref={register}>
                                            <option></option>
                                        </Input> */}
                                    </FormGroup>
                                    <FormGroup check inline className="pb-2 ">
                                        <Label check className="pr-3">
                                            <Input type="radio" name="date" value="bs"  onChange={()=>setAD(false) }  defaultChecked/>
                                        B.S.
                                        </Label>
                                        {/* </FormGroup>
                                        <FormGroup check> */}
                                        <Label check>
                                            <Input type="radio" name="date" value="ad"  onChange={()=>setAD(true) }/>
                                            A.D.
                                        </Label>
                                    </FormGroup>
                                    <Row >
                                    
                                    <Col md="6">
                                     <FormGroup className="form-group-vertical">
                                    <label
                                            className="form-control-label"
                                            htmlFor="input-notice-publication-date"
                                        >
                                           Notice Publication Date
                                           
                                        </label>
                                    <div>
                                    {!ad ? 
                                    <NepaliDatePicker 
                                    inputClassName="form-control "
                                    id   = "notice-publication-date"
                                    className="nep_date" 
                                    options={{ calenderLocale: "en", valueLocale: "en" }}
                                    value={pubdate}
                                    onChange={(value) => setPubDate(value)}
                                    name="datestart" />:
                                    <DatePicker id   = "notice-publication-date" 
                                    value={pubdate}
                                     onChange={(value) => setPubDate(value)}
                                    name="datestart" />}
                                   
                                    {error && <span className="text-danger error">{error.noticepubdate}</span>}
                                    </div>
                                     </FormGroup>
                                    </Col>
                                    <Col md="6">
                                     <FormGroup className="form-group-vertical">
                                    <label
                                            className="form-control-label"
                                            htmlFor="input-bid-submission-date"
                                        >
                                           Last Day of Bid Submission
                                        </label>
                                    <div>
                                    {!ad ? <NepaliDatePicker 
                                    inputClassName="form-control "
                                    id   = "bid-submission-date"
                                    className="nep_date" 
                                    readOnly={false}
                                    options={{ calenderLocale: "en", valueLocale: "en" }}
                                   value={subdate}
                                    onChange={(value) => setSubDate(value)}
                                    name="bidsubmission" /> :
                                    <DatePicker id   = "bid-submission-date" 
                                    value={subdate}
                                    onChange={(value) => setSubDate(value)}
                                    name="bidsubmission" /> 
                                    }
                                    {error && <span className="text-danger error">{error.bidsubdate}</span>}
                                    </div>
                                    </FormGroup>
                                    </Col>
                                    </Row>
                                    <Button size="md" color="primary" type="submit">ADD</Button>

                                </form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
