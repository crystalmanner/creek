import { API, graphqlOperation } from "aws-amplify";
import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  FormText,
  Modal,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeEmail } from "../../graphql/mutations";
import { validateEmail } from "../../helpers/validations";
import { ACTIONS } from "../../redux/actionTypes";

const EditEmailModal = ({ show, close }) => {
  const [email, setEmail] = useState("");
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userStore);
  useEffect(() => {
    if (userInfo) {
      setEmail(userInfo.email);
    }
  }, [userInfo]);
  const updateEmail = async () => {
    setLoading(true);
    try {
      let user = {
        cognitoUserName: userInfo.cognitoUserName,
        userId: userInfo.id,
        email: email,
      };
      const rt = await API.graphql(
        graphqlOperation(changeEmail, {
          input: user,
        })
      );
      if (rt.data.changeEmail.data) {
        dispatch({
          type: ACTIONS.SET_USER,
          user: {
            ...userInfo,
            email: email,
          },
        });
        close();
      } else {
        setEmailErrMsg(rt.data.changeEmail.error.message);
      }
    } catch (err) {}
    setLoading(false);
  };
  return (
    <>
      <Modal show={show} onHide={close}>
        <Modal.Header className="justify-content-start" closeButton>
          <Modal.Title>Edit Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup controlId="email">
            <FormLabel className="required">Email</FormLabel>
            <FormControl
              type="text"
              placeholder="Enter Email"
              className={email && validateEmail(email) ? "completed" : ""}
              value={email}
              onChange={(e) => {
                setEmailErrMsg("");
                setEmail(e.target.value);
              }}
              isInvalid={(!validateEmail(email) || emailErrMsg) && email}
            />
            <FormControl.Feedback type="invalid">
              {emailErrMsg ? emailErrMsg : "Invalid Email Address"}
            </FormControl.Feedback>
            <FormText className="font-italic">
              This will also be your username
            </FormText>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            disabled={!email || !validateEmail(email) || loading}
            onClick={() => updateEmail()}
          >
            {loading && (
              <Spinner
                size="sm"
                style={{ marginRight: 10 }}
                animation="border"
                role="status"
              />
            )}
            UPDATE
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditEmailModal;
