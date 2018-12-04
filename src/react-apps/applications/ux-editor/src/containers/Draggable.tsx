import * as React from 'react';
import {
  ConnectDragSource,
  DragSource,
  DragSourceConnector,
  DragSourceMonitor,
  DragSourceSpec,
} from 'react-dnd';

export interface IDraggableProps {
  id?: string;
  notDraggable?: boolean;
  onDrop?: (...args: any) => void;
}

interface IDraggablePropsCollected {
  isDragging: boolean;
  connectDragSource: ConnectDragSource;
}

class Draggable extends React.Component<
  IDraggableProps &
  IDraggablePropsCollected,
  any
  > {
  public render() {
    const { connectDragSource } = this.props;
    return connectDragSource(
      <div>
        {this.props.children}
      </div>,
    );
  }
}

export default (type: string, draggableSpec: DragSourceSpec<IDraggableProps, any>) =>
  DragSource(
    type,
    draggableSpec,
    (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    }),
  )(
    Draggable,
  );
