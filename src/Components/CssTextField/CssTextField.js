import React from 'react';
import TextField from '@mui/material/TextField';

class CssTextField extends React.Component {

    render() {
        return (
                <TextField
                    defaultValue={this.props.defaultValue}
                    className="text-field"
                    required = {!!this.props.required}
                    name={this.props.name}
                    onChange={this.props.onChange}
                    style = {{
                        margin : "10px",
                        width : "200px",
                    }}
                    type = {this.props.password  ? "password" : "text" }
                    label= {this.props.text}
                    InputLabelProps={{
                        style: {
                            color: this.props.color
                        } }}
                    variant="outlined"
                    sx={
                        {
                            input:
                                {color: this.props.color},
                            '& label.Mui-focused ':
                                {color: this.props.color},
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: this.props.color,
                                },
                                '&:hover fieldset': {
                                    borderColor: this.props.color,
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: this.props.color,
                                },
                            }
                        }
                    }
                />
        )
    }
}

export default CssTextField;