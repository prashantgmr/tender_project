import React, {useReducer, useContext} from 'react'
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
import Header from "../../components/Headers/Header.js";
import axios from 'axios';
import { GlobalContext } from '../../context/GlobalContext.js';


export default function CreateUser() {
    const { register, handleSubmit, errors } = useForm();
    const {addedUser , user} =useContext(GlobalContext)
        
    const onSubmit = (data) => {

             addedUser(data)
    }

    return (
        <>
            <Header />
            <Container className="mt-n4" fluid>
                <Row>
                    <Col className="order-xl-1" xl="12">
                        <Card className="bg-secondary shadow">
                            {user.isAdmin ? 
                            <>
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">Add User</h3>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody className="tender_form">
                                <form onSubmit={handleSubmit(onSubmit)} method="POST" encType="multipart/form-data">

                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-full-name"
                                        >
                                            Full Name
                                         </label>
                                        <input
                                            className="form-control-alternative form-control"
                                            id="input-full-name"
                                            name="name"
                                            placeholder="Enter Full Name"
                                            type="text"
                                            ref={register}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-email"
                                        >
                                           Email
                                        </label>
                                        <input
                                            className="form-control-alternative form-control"
                                            id="input-email"
                                            placeholder="Enter Email"
                                            type="email"
                                            ref ={register}
                                            name="email"
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-username"
                                        >
                                            Username
                                        </label>
                                        <input
                                            className="form-control-alternative form-control"
                                            // defaultValue="Lucky"
                                            id="input-username"
                                            placeholder="Enter Username"
                                            type="text"
                                            ref={register}
                                            name="username"
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-password"
                                        >
                                            Password
                                        </label>
                                        <input
                                            className="form-control-alternative form-control"
                                            // defaultValue="Jesse"
                                            id="input-password"
                                            placeholder="Enter Password"
                                            type="password"
                                            ref={register}
                                            name="password"
                                        />
                                    </FormGroup>
                                    <Button size="md" color="primary" type="submit">CREATE USER</Button>

                                </form>
                            </CardBody>
                            </> :
                            <CardBody>
                                <h2>You are not authorized to create user</h2>
                            </CardBody>
                            }
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

