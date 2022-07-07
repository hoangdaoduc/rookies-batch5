import "./LoginPage.css"
import { useContext, useState } from "react";
import { validateEmail, validatePassword } from '../../shared/helpers/validate/validate';
import { Button, Form } from 'react-bootstrap';
import LanguageContext from '../../shared/contexts/LanguageContext';
import axios from 'axios';
import UserContext from '../../shared/contexts/UserContext';


const getText = (language, codeText) => {
  const TEXTS = {
    EMAIL: {
      en: "Email",
      vi: "Thư điện tử"
    },
    PASSWORD: {
      en: "Password",
      vi: "Mật khẩu"
    }
  }
  return TEXTS[codeText][language]
}

const Loginpage = () => {
  const language = useContext(LanguageContext);
  const [values, setValues] = useState({
    email: "",
    password: ""
  });
  const { setToken, setUserId } = useContext(UserContext)
  
  const [touched, setTouched] = useState({
    email: false,
    password: false
  })
  
  const errorEmail = validateEmail(values.email);
  
  const errorPassword = validatePassword(values.password);
  
  const handleChange = evt => {
    console.log("evt = ", evt)
    setValues({
      ...values,
      [evt.target.name]: evt.target.value
    })
  }
  
  const handleBlur = evt => {
    setTouched({
      ...touched,
      [evt.target.name]: true
    })
  }
  
  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log("values = ", values);
    axios.get("https://60dff0ba6b689e001788c858.mockapi.io/token", { data: values})
      .then(response => {
        console.log("response = ", response);
        setToken(response.data.token);
        setUserId(response.data.userId);
      })
  }
  
  const formValid = !errorEmail && !errorPassword;
  return (
    
    <Form onSubmit={ handleSubmit } validated={ false }>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label> { getText(language, "EMAIL")} </Form.Label>
        <Form.Control
          required
          name="email"
          value={ values.email }
          onChange={ handleChange }
          onBlur={ handleBlur }
          type="email"
          placeholder="Enter email"
          isInvalid={ touched.email && Boolean(errorEmail) }
          isValid={ touched.email && !Boolean(errorEmail) }
        />
        <Form.Control.Feedback type="invalid">{ errorEmail }</Form.Control.Feedback>
        <Form.Control.Feedback type="valid">Email look goods</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>{ getText(language, "PASSWORD")}</Form.Label>
        <Form.Control
          name="password"
          value={ values.password }
          onChange={ handleChange }
          onBlur={ handleBlur }
          type="password"
          placeholder="Password"
          isInvalid={ touched.password && Boolean(errorPassword) }
          isValid={ touched.password && !Boolean(errorPassword) }
        />
        <Form.Control.Feedback type="invalid">{ errorPassword }</Form.Control.Feedback>
        <Form.Control.Feedback type="valid">Password look good</Form.Control.Feedback>
      </Form.Group>
      <Button disabled={ !formValid } variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  
  )
}

export default Loginpage;
