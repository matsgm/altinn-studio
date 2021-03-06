import { createMuiTheme } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import * as React from 'react';
import altinnTheme from '../theme/altinnStudioTheme';

export interface IAltinnIconCompontentProvidedProps {
  classes: any;
  iconClass: string;
  isActive?: boolean;
  isActiveIconColor?: string;
  iconColor: any;
  iconSize?: number;
}

export interface IAltinnIconComponentState {
}
const theme = createMuiTheme(altinnTheme);

const styles = {
  activeIcon: {
    color: theme.altinnPalette.primary.blueDark,
  },
};

class AltinnIcon extends React.Component<IAltinnIconCompontentProvidedProps, IAltinnIconComponentState> {
  public render() {
    return (
      <i
        className={
          classNames(
            this.props.iconClass,
          )}
        style={{
          color: this.props.isActive ? this.props.isActiveIconColor : this.props.iconColor,
          fontSize: this.props.iconSize ? this.props.iconSize : null,
        }}
      />
    );
  }
}

export default withStyles(styles)(AltinnIcon);
