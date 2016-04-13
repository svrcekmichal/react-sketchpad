import { v4 } from 'uuid';

export default (context) => {
  let rectangle = null;
  let imageData = null;

  const onMouseDown = (x, y, color, size, fill) => {
    rectangle = {
      id: v4(),
      tool: 'RECTANGLE',
      color,
      size,
      fill,
      start: { x, y },
      end: null
    };
    imageData = context.getImageData(0, 0, context.canvas.clientWidth, context.canvas.clientHeight);
    return [rectangle];
  };

  const drawRectangle = (mouseX, mouseY) => {
    const startX = mouseX < rectangle.start.x ? mouseX : rectangle.start.x;
    const startY = mouseY < rectangle.start.y ? mouseY : rectangle.start.y;
    const widthX = Math.abs(rectangle.start.x - mouseX);
    const widthY = Math.abs(rectangle.start.y - mouseY);

    context.beginPath();
    context.lineWidth = rectangle.size;
    context.strokeStyle = rectangle.color;
    context.fillStyle = rectangle.fill;
    context.rect(startX, startY, widthX, widthY);
    context.stroke();
    if (rectangle.fill) context.fill();
  };

  const onMouseMove = (x, y) => {
    if (!rectangle) return;
    context.putImageData(imageData, 0, 0);
    context.save();
    drawRectangle(x, y);
    context.restore();
  };

  const onMouseUp = (x, y) => {
    if (!rectangle) return;
    onMouseMove(x, y);
    const item = rectangle;
    imageData = null;
    rectangle = null;
    item.end = { x, y };
    return [item];
  };

  return {
    onMouseDown,
    onMouseMove,
    onMouseUp,
  };
};
