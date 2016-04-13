import { v4 } from 'uuid';

export default (context) => {
  let stroke = null;
  let points = [];

  const onMouseDown = (x, y, color, size) => {
    stroke = {
      id: v4(),
      tool: 'PENCIL',
      color,
      size,
      points: [{ x, y }]
    };
    return [stroke];
  };

  const onMouseMove = (x, y) => {
    if (!stroke) return [];

    const newPoint = { x, y };

    context.save();
    context.lineJoin = 'round';
    context.lineCap = 'round';
    context.beginPath();
    context.lineWidth = stroke.size;
    context.strokeStyle = stroke.color;
    context.globalCompositeOperation = 'source-over';

    const start = stroke.points.slice(-1)[0];
    context.moveTo(start.x, start.y);

    context.lineTo(x, y);
    context.closePath();
    context.stroke();
    context.restore();

    stroke.points.push(newPoint);
    points.push(newPoint);

    return [stroke];
  };

  const onDebouncedMouseMove = () => {
    const debouncedPoints = points;
    points = [];
    return [stroke, debouncedPoints];
  };

  const onMouseUp = (x, y) => {
    if (!stroke) return;
    onMouseMove(x, y);
    points = [];
    const item = stroke;
    stroke = null;
    return [item];
  };

  return {
    onMouseDown,
    onMouseMove,
    onDebouncedMouseMove,
    onMouseUp,
  };
};
