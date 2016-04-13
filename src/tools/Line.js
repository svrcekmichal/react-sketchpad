import { v4 } from 'uuid';

export default (context) => {
  let currentLine = null;
  let imageData = null;

  const onMouseDown = (x, y, color, size) => {
    currentLine = {
      id: v4(),
      tool: 'LINE',
      color,
      size,
      start: { x, y },
      end: null
    };
    imageData = context.getImageData(0, 0, context.canvas.clientWidth, context.canvas.clientHeight);
    return [currentLine];
  };

  const onMouseMove = (x, y) => {
    if (!currentLine) return;
    context.putImageData(imageData, 0, 0);
    context.save();
    context.lineJoin = 'round';
    context.lineCap = 'round';
    context.beginPath();
    context.lineWidth = currentLine.size;
    context.strokeStyle = currentLine.color;
    context.globalCompositeOperation = 'source-over';
    context.moveTo(currentLine.start.x, currentLine.start.y);
    context.lineTo(x, y);
    context.closePath();
    context.stroke();
    context.restore();
  };

  const onMouseUp = (x, y) => {
    if (!currentLine) return;
    onMouseMove(x, y);
    const line = currentLine;
    imageData = null;
    currentLine = null;
    line.end = { x, y };
    return [line];
  };

  return {
    onMouseDown,
    onMouseMove,
    onMouseUp,
  };
};
