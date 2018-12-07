import { FormControl, InputAdornment, TextField, createMuiTheme } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import * as React from 'react';
import 'typeface-roboto';
import altinnTheme from '../theme/altinnStudioTheme';

export interface IAltinnSearchInputCompontentProvidedProps {
  classes: any;
  id: string;
  placeholder: any;
  onChangeFunction: any;
}

export interface IAltinnSearchInputComponentProps extends IAltinnSearchInputCompontentProvidedProps {
}
export interface IAltinnSearchInputComponentState {
}

const theme = createMuiTheme(altinnTheme);

const styles = {
  searchBox: {
    border: '1px solid ' + theme.palette.primary.dark,
    marginTop: '10px',
    marginBottom: '24px',
    background: 'none',
    width: '386px',
  },
  searchBoxInput: {
    fontSize: '16px',
    color: '#000000',
    padding: '6px',
  },
  searchBoxIcon: {
    color: '#000000',
    fontSize: '30px',
    marginRight: '10px',
    marginBottom: '5px',
  },
}

class AltinnSearchInput extends React.Component<IAltinnSearchInputComponentProps, IAltinnSearchInputComponentState> {
  public render() {
    return (
      <FormControl
        classes={{ root: classNames(this.props.classes.searchBox) }}
        fullWidth={true}
      >
        <TextField
          id={this.props.id}
          placeholder={this.props.placeholder}
          onChange={this.props.onChangeFunction}
          InputProps={{
            disableUnderline: true,
            startAdornment:
              <InputAdornment
                position={'end'}
                classes={{ root: classNames(this.props.classes.searchBoxIcon) }}
              >
                <i className={'ai ai-search'} />
              </InputAdornment>,
            classes: { root: classNames(this.props.classes.searchBoxInput) },
          }}
        />
      </FormControl>
    );
  }
}

export default withStyles(styles)(AltinnSearchInput);