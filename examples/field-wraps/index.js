import React from 'react'
import ReactDOM from 'react-dom'
import { Form, Field } from 'src'

const TextField = props => {
  const { name, type, input } = props
  return <input type={type || 'text'} id={`field-` + name} name={name} {...input} />
}

const FieldWrap = props => {
  const { label, type, name, component: Component, ...rest } = props

  return (
    <Field name={name} {...rest} render={(input, fieldState, formState) => {
      // Access to field and form state
      console.log('Field State', fieldState)
      console.log('Form State State', formState)

      return (
        <div className="field-wrap">
          <label htmlFor={`field-` + name}>{label}</label>
          <div className="input">
            <Component input={input} name={name} type={type} />
          </div>
          <div className="error">
            {fieldState.error}
          </div>
        </div>
      )

    }} />
  )
}

class LoginForm extends React.Component {

  validate(values) {
    const errors = {}
    if (!/^[\w\d\.]+@[\w\d]+\.[\w]{2,9}$/.test(values.email)) errors.email = 'Invalid Email'
    return errors
  }

  render() {

    // The password field was left out of this example on purpose to limit
    // the amount of console logs for state changes.

    return (
      <Form validate={this.validate}>
        <FieldWrap label="Email" name="email" component={TextField} />
        <button type="submit">Submit</button>
      </Form>
    )
  }
}

ReactDOM.render(<LoginForm />, document.getElementById('root'))
