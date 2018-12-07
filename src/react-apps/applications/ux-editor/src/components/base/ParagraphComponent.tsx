import * as React from 'react';

export interface IParagraphProps {
  component: IFormComponent;
  text: string;
}

export interface IParagraphState { }

export class ParagraphComponent extends React.Component<IParagraphProps, IParagraphState> {

  public render() {
    return (
      <div className='row'>
        <span id={this.props.component.id}>{this.props.text}</span>
      </div>
    );
  }
}
